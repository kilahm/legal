<?php
declare(strict_types=1);

namespace App\Persistence;

use App\Persistence\Query\Insert;
use App\Persistence\Query\RawFragment;
use App\Persistence\Query\SqlFragment;
use Psr\Log\LoggerInterface;

class Db
{
    /** @var \PDO */
    private $connection;

    /** @var LoggerInterface */
    private $logger;

    public function __construct(\PDO $connection, LoggerInterface $logger)
    {
        $this->connection = $connection;
        $this->logger = $logger;
    }

    public static function raw(string $sql, array $params = []): RawFragment
    {
        return new RawFragment($sql, $params);
    }

    public static function serialize($data): SqlFragment
    {
        if ($data === null || is_scalar($data)) {
            return self::raw('?', [$data]);
        }

        if (is_array($data)) {
            list($sql, $values) = self::serializeArray($data);
            return self::raw($sql, $values);
        }

        throw new \InvalidArgumentException('Only arrays and scalars may be serialized for the database');
    }

    private static function serializeArray(array $data): array
    {
        $result = ['sql' => [], 'values' => []];
        foreach ($data as $value) {
            list($sql, $values) = self::serializeArrayElement($value);
            $result['sql'][] = $sql;
            $result['values'] = array_merge($result['values'], $values);
        }
        return [
            'ARRAY[' . implode(',', $result['sql']) . ']',
            $result['values'],
        ];
    }

    private static function serializeArrayElement($value): array
    {
        if (is_scalar($value)) {
            return ['?', [$value]];
        }

        if (is_array($value)) {
            return self::serializeArray($value);
        }

        throw new \InvalidArgumentException('Only arrays and scalars may be serialized for the database');
    }

    public static function unserializeArray(?string $data): array
    {
        if ($data === null) {
            return null;
        }
        $pattern = '/^{(.*?)}$/';
        $matches = [];
        if (!preg_match($pattern, $data, $matches)) {
            throw new \RuntimeException('Array values from the DB must be wrapped in {}');
        }
        if ($matches[1] === '') {
            return [];
        }
        $body = $matches[1] . ',';
        $splitPattern = '/((?:[^,\\\\]|\\\\,|\\\\\\\\)*?,)/';
        $matches = [];
        preg_match_all($splitPattern, $body, $matches);
        return array_map(
            function (string $match) {
                $match = rtrim($match, ',');
                return strtr($match, ['\\\\' => '\\', '\\,' => ',']);
            },
            $matches[0]
        );
    }

    public static function wrapToken(string $field)
    {
        $parts = explode('.', $field);
        $wrappedParts = array_map(
            function (string $part): string {
                return "\"$part\"";
            },
            $parts
        );
        return implode('.', $wrappedParts);
    }

    public function insertInto(string $table): Insert
    {
        return new Insert($table, $this);
    }

    public function lastInsertId(): string
    {
        return $this->connection->lastInsertId();
    }

    public function execute(SqlFragment $fragment)
    {
        $sql = $fragment->toSql();
        $params = $fragment->getParameters();
        $this->logger->debug($sql);
        $statement = $this->connection->prepare($sql);
        if (!$statement->execute($params)) {
            throw new SqlError($statement);
        }
        return new Response($statement);
    }

    public function fetch(string $table): Query\Fetch
    {
        return new Query\Fetch($table, $this);
    }

    public function update(string $table): Query\Update
    {
        return new Query\Update($table, $this);
    }
}