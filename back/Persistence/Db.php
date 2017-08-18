<?php
declare(strict=1);

namespace App\Persistence;

use App\Util\Arr;

class Db
{
    /** @var \PDO */
    private $connection;

    public function __construct(\PDO $connection)
    {
        $this->connection = $connection;
    }

    public static function serializeArray(?array $data): ?string
    {
        if ($data === null) {
            return null;
        }

        $bulk = array_reduce($data, function (string $payload, $value): string {
            if (is_array($value)) {
                $value = self::serializeArray($value);
            }
            return $payload . ',' . (string)$value;
        }, '');

        return '{' . $bulk . '}';
    }

    public static function unseraliazeArray(?string $data): array
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

    public function insert(string $table, array $data): void
    {
        if (empty($data)) {
            throw new \RuntimeException('Attempting to insert an empty data set');
        }
        // TODO: abstract all this logic into an Insert class

        $data = Arr::isVector($data) ? $data : [$data];
        $fields = $this->extractInsertFields($data);
        $serializedData = $this->serializeData($fields, $data);
        $SQL = sprintf('INSERT INTO "%s" ');
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

    private function extractInsertFields(array $data): array
    {
        $firstFields = array_keys($data[0]);
        foreach ($firstFields as $field) {
            if (!is_string($field)) {
                throw new \InvalidArgumentException('Insert field names must all be strings');
            }
        }
        return $firstFields;
    }

    private function serializeData(array $fields, array $data)
    {
        $mappedRows = array_map(function (array $row) use ($fields): string {

        }, $data);
        if(count($mappedRows) === 1) {
            return $mappedRows[0];
        }
        return '(' . implode(',', $mappedRows) . ')';
    }
}