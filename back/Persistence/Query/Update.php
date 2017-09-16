<?php
declare(strict_types=1);

namespace App\Persistence\Query;

use App\Persistence\Db;
use App\Util\Arr;

class Update implements SqlFragment
{
    use Where;

    /** @var SqlFragment[] */
    private $setFields = [];
    /** @var SqlFragment[] */
    private $increments = [];
    /** @var string */
    private $table;
    /** @var Db */
    private $db;

    public function __construct(string $table, Db $db)
    {
        $this->table = Db::wrapToken($table);
        $this->db = $db;
    }

    public function set(array $data): self
    {
        $this->setFields = [];
        foreach ($data as $field => $value) {
            $serialized = Db::serialize($value);
            $this->setFields[] = Db::raw(
                Db::wrapToken($field) . '=' . $serialized->toSql(),
                $serialized->getParameters()
            );
        }
        return $this;
    }

    public function increment(string $field, int $amount): self
    {
        if ($amount === 0) {
            return $this;
        }

        $sign = $amount > 0 ? '+' : '-';
        $field = Db::wrapToken($field);
        $this->increments[] = Db::raw("$field = $field $sign ?", [$amount]);
        return $this;
    }

    public function decrement(string $field, int $amount): self
    {
        return $this->increment($field, -$amount);
    }

    /**
     * Valid SQL statement with PDO compatible replacement tokens
     *
     * @return string
     */
    public function toSql(): string
    {
        return $this->buildFullQuery()->toSql();
    }

    /**
     * Array of values to use for the tokens
     *
     * @return string[]
     */
    public function getParameters(): array
    {
        return $this->buildFullQuery()->getParameters();
    }

    private function buildFullQuery(): SqlFragment
    {
        return new MultiFragment(
            ' ',
            $this->getBaseClause(),
            $this->getFieldClause(),
            $this->getWhereClause()
        );
    }

    private function getBaseClause(): SqlFragment
    {
        return Db::raw('UPDATE ' . $this->table . ' SET');
    }

    private function getFieldClause(): SqlFragment
    {
        return new MultiFragment(',', ...$this->setFields, ...$this->increments);
    }

    public function execute(): void
    {
        $this->db->execute($this->buildFullQuery());
    }
}