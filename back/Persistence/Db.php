<?php
declare(strict_types=1);

namespace App\Persistence;

use App\Persistence\Query\Insert;

class Db
{
    /** @var \PDO */
    private $connection;

    public function __construct(\PDO $connection)
    {
        $this->connection = $connection;
    }

    public static function serialize($data)
    {
        if ($data === null) {
            return null;
        }

        if (is_scalar($data)) {
            return $data;
        }

        if (is_array($data)) {
            return self::serializeArray($data);
        }

        throw new \InvalidArgumentException('Only arrays and scalars may be serialized for the database');
    }

    private static function serializeArray(array $data): string
    {
        return '{'
            . implode(',', array_map(
                function ($value) {
                    return self::serializeArrayValue($value);
                },
                $data
            ))
            . '}';
    }

    private static function serializeArrayValue($value)
    {
        if (is_string($value)) {
            return preg_replace('/(,|\\\\)/', '\\\\$1', $value);
        }
        return self::serialize($value);
    }

    public static function unserializeArray(?string $data): array
    {
        if ($data === null) {
            return null;
        }
        $pattern = '/^\{(:?(.+?),)*\}$';
        $matches = [];
        if (preg_match($pattern, $data, $matches)) {
            return $matches;
        }
        throw new \RuntimeException('Expected value from DB to be an array');
    }

    public function fetchAll(string $sql, ?array $params = null): \Iterator
    {
        $statement = $this->run($sql, $params);

        $row = $statement->fetch(\PDO::FETCH_ASSOC);
        while (is_array($row)) {
            yield $row;
            $row = $statement->fetch(\PDO::FETCH_ASSOC);
        }
    }

    public function fetchOne(string $sql, ?array $params = null): ?array
    {
        return $this
            ->run($sql, $params)
            ->fetch(\PDO::FETCH_ASSOC)
            ?: null;
    }

    public function insertInto(string $table): Insert
    {
        return new Insert($table, $this);
    }

    public function lastInsertId(): string
    {
        return $this->connection->lastInsertId();
    }

    private function run(string $sql, ?array $params): \PDOStatement
    {
        $statement = $this->connection->prepare($sql);
        $statement->execute($params);
        return $statement;
    }

    public function execute(string $sql, ?array $parameters = null)
    {
        $this->run($sql, $parameters);
    }
}