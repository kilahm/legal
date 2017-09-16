<?php
declare(strict_types=1);

namespace App\Persistence\Query\Constraint;

use App\Persistence\Db;
use App\Persistence\Query\MultiFragment;
use App\Persistence\Query\SqlFragment;

class In implements SqlFragment
{

    /** @var string */
    private $field;

    /** @var array */
    private $values;

    public function __construct(string $field, array $values)
    {
        $this->field = $field;
        $this->values = new MultiFragment(',', ...array_map([Db::class, 'serialize'], $values));
    }

    public function toSql(): string
    {
        return implode(' ', [Db::wrapToken($this->field), 'IN', '(' . $this->values->toSql() . ')']);
    }

    /**
     * Array of values to use for the tokens
     *
     * @return string[]
     */
    public function getParameters(): array
    {
        return $this->values->getParameters();
    }
}