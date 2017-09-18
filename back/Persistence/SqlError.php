<?php
declare(strict_types=1);

namespace App\Persistence;

class SqlError extends \LogicException
{
    /** @var string */
    private $sql;

    public function __construct(\PDOStatement $statement)
    {
        $info = $statement->errorInfo();
        $this->sql = $statement->queryString;
        parent::__construct($info[2], (int)$info[0]);
    }

    public function getSql(): string
    {
        return $this->sql;
    }
}