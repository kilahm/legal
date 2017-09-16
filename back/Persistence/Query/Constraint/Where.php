<?php
declare(strict_types=1);

namespace App\Persistence\Query\Constraint;

use App\Persistence\Query\SqlFragment;

class Where implements SqlFragment
{
    /** @var SqlFragment */
    private $clause;

    public function __construct(SqlFragment $clause)
    {
        $this->clause = $clause;
    }

    public function toSql(): string
    {
        $sql = $this->clause->toSql();
        if($sql === '') {
            return '';
        }
        return 'WHERE ' . $sql;
    }

    public function getParameters(): array
    {
        return $this->clause->getParameters();
    }
}