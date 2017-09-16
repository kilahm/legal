<?php
declare(strict_types=1);

namespace App\Persistence\Query\Constraint;

use App\Persistence\Query\SqlFragment;

trait BuildsConstraint
{
    private function buildConstraint(string $field, Op $operator, $value): SqlFragment
    {
        switch ($operator) {
            case Op::EQUAL():
                return new Eq($field, $value);
            case Op::GREATER_THAN():
                return new Gt($field, $value);
            case Op::GREATER_OR_EQUAL():
                return new Gte($field, $value);
            case Op::LESS_THAN():
                return new Lt($field, $value);
            case Op::LESS_OR_EQUAL():
                return new Lte($field, $value);
            case Op::IN():
                return new In($field, $value);
        }
    }

}