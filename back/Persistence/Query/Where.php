<?php
declare(strict_types=1);

namespace App\Persistence\Query;

use App\Persistence\Query\Constraint\Builder;
use App\Persistence\Query\Constraint\BuildsConstraint;
use App\Persistence\Query\Constraint\Op;

trait Where
{
    use BuildsConstraint;
    /** @var null|Constraint\Where */
    private $where;

    public function where(string $field, Op $operator, $value): self
    {
        $this->where = new Constraint\Where($this->buildConstraint($field, $operator, $value));
        return $this;
    }

    public function complexWhere(callable $sqlBuilder): self
    {
        $builder = new Builder();
        $sqlBuilder($builder);
        $this->where = $builder->getWhere();
        return $this;
    }

    public function getWhereClause(): SqlFragment
    {
        if ($this->where === null) {
            return new RawFragment('', []);
        }
        return $this->where;
    }
}