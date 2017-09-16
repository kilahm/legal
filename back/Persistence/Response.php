<?php
declare(strict_types=1);

namespace App\Persistence;

class Response
{
    /** @var \PDOStatement */
    private $statement;

    public function __construct(\PDOStatement $statement)
    {
        $this->statement = $statement;
    }

    public function fetchAll(): \Iterator
    {
        $row = $this->statement->fetch(\PDO::FETCH_ASSOC);
        while (is_array($row)) {
            yield $row;
            $row = $this->statement->fetch(\PDO::FETCH_ASSOC);
        }
    }

    public function fetchOne(): ?array
    {
        return $this->statement->fetch(\PDO::FETCH_ASSOC) ?: null;
    }
}