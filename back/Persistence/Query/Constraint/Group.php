<?php
declare(strict_types=1);

namespace App\Persistence\Query\Constraint;

use App\Persistence\Query\SqlFragment;

abstract class Group implements SqlFragment
{
    /** @var SqlFragment[] */
    protected $parts;
    const COMBINATOR = null;

    public function __construct(SqlFragment ...$parts)
    {
        if (static::COMBINATOR === null) {
            throw new \RuntimeException('Implementation of constraint group did not define COMBINATOR');
        }
        $this->parts = $parts;
    }

    public function toSql(): string
    {
        if (count($this->parts) === 0) {
            return '';
        }

        $sqlParts = array_map(
            function (SqlFragment $fragment) {
                return $fragment->toSql();
            },
            $this->parts
        );
        if (count($sqlParts) === 1) {
            return $sqlParts[0];
        }
        return '(' . implode(' ' . static::COMBINATOR . ' ', $sqlParts) . ')';
    }

    public function getParameters(): array
    {
        return array_reduce(
            $this->parts,
            function (array $parameters, SqlFragment $fragment): array {
                return array_merge($parameters, $fragment->getParameters());
            },
            []
        );
    }
}