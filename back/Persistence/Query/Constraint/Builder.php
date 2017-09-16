<?php
declare(strict_types=1);

namespace App\Persistence\Query\Constraint;

use App\Persistence\Query\SqlFragment;

class Builder
{
    use BuildsConstraint;

    /** @var SqlFragment[] */
    private $constraints = [];
    /** @var string */
    private $op = 'and';

    public function declareAnd(): self
    {
        $this->op = 'and';
        return $this;
    }

    public function declareOr(): self
    {
        $this->op = 'or';
        return $this;
    }

    public function addCondition(string $field, Op $operator, $value): self
    {
        $this->constraints[] = $this->buildConstraint($field, $operator, $value);
        return $this;
    }

    public function addRawCondition(SqlFragment $sql): self
    {
        $this->constraints[] = $sql;
        return $this;
    }

    public function subGroup(callable $sqlBuilder): self
    {
        $builder = new Builder();
        $sqlBuilder($builder);
        if ($builder->op === $this->op) {
            $this->constraints = array_merge($this->constraints, $builder->constraints);
        } else {
            $this->constraints[] = $builder->buildCombinedConstraint();
        }
        return $this;
    }

    public function getWhere(): Where
    {
        return new Where($this->buildCombinedConstraint());
    }

    private function buildCombinedConstraint(): SqlFragment
    {
        if ($this->op === 'and') {
            return new AndGroup(...$this->constraints);
        }
        return new OrGroup(...$this->constraints);
    }

}