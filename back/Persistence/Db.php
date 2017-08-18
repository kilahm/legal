<?php
declare(strict=1);

namespace App\Persistence;

class Db
{
    /** @var \PDO */
    private $connection;

    public function __construct(\PDO $connection)
    {
        $this->connection = $connection;
    }

    public function table(string $table): QueryBuilder
    {
        return new QueryBuilder($table);
    }

    public function serializeArray(?array $data): ?string
    {
        if ($data === null) {
            return null;
        }

        $bulk = array_reduce($data, function (string $payload, $value): string {
            return $payload . ',' . (string)$value;
        }, '');

        return '{' . $bulk . '}';
    }

    public function unseraliazeArray(?string $data): array
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
        $statement = $this->connection->prepare($sql);
        $statement->execute($params);

        $row = $statement->fetch(\PDO::FETCH_ASSOC);
        while (is_array($row)) {
            yield $row;
            $row = $statement->fetch(\PDO::FETCH_ASSOC);
        }
    }
}