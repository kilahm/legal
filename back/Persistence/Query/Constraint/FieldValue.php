<?php
declare(strict_types=1);

namespace App\Persistence\Query\Constraint;

use App\Persistence\Db;
use App\Persistence\Query\SqlFragment;

abstract class FieldValue implements SqlFragment
{
    const OP = '';

    /** @var string */
    private $field;
    /** @var SqlFragment */
    private $value;

    public function __construct(string $field, $value)
    {
        $this->field = $field;
        $this->value = Db::serialize($value);
    }

    public function toSql(): string
    {
        if (static::OP === '') {
            throw new \RuntimeException('Invalid constraint class: ' . static::class);
        }
        return implode(' ', [Db::wrapToken($this->field), static::OP, $this->value->toSql()]);
    }

    public function getParameters(): array
    {
        return $this->value->getParameters();
    }
}