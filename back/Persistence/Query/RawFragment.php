<?php
declare(strict_types=1);

namespace App\Persistence\Query;

use App\Persistence\Db;

class RawFragment implements SqlFragment
{
    /** @var string */
    private $fragment;

    /** @var array */
    private $values;

    public function __construct(string $fragment, array $values = [])
    {
        foreach ($values as $value) {
            if ($value !== null && !is_scalar($value)) {
                throw new \InvalidArgumentException('Raw SQL statements can only have scalars as values');
            }
        }
        $this->fragment = $fragment;
        $this->values = $values;
    }

    public function toSql(): string
    {
        return $this->fragment;
    }

    public function getParameters(): array
    {
        return $this->values;
    }
}