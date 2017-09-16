<?php
declare(strict_types=1);

namespace App\Persistence\Query;

use App\Persistence\Db;

class Fetch implements SqlFragment
{
    use Where;
    const ASC = 'ASC';
    const DESC = 'DESC';

    /** @var string */
    private $table;
    /** @var Db */
    private $db;
    /** @var string */
    private $fields = '*';
    /** @var int */
    private $limit = -1;
    /** @var int */
    private $offset = 0;
    /** @var array */
    private $sorts = [];

    public function __construct(string $table, Db $db)
    {
        $this->table = Db::wrapToken($table);
        $this->db = $db;
    }

    public function fields(string ...$fields): self
    {
        $this->fields = implode(
            ',',
            array_map(
                function (string $field) {
                    return Db::wrapToken($field);
                },
                $fields
            )
        );
        return $this;
    }

    public function sortByName(string $column, Sort $direction): self
    {
        $this->sorts[] = Db::wrapToken($column) . $direction->getValue();
        return $this;
    }

    public function sortByIndex(int $column, Sort $direction): self
    {
        $this->sorts[] = [$column, $direction];
        return $this;
    }

    public function sortDesc(string $column): self
    {
        $this->sorts[] = [Db::wrapToken($column), self::DESC];
        return $this;
    }

    public function limit(int $limit): self
    {
        if ($limit < 1) {
            throw new \RangeException('Sql select limit must be greater than 0');
        }
        $this->limit = $limit;
        return $this;
    }

    public function offset(int $offset): self
    {
        if ($offset < 0) {
            throw new \RangeException('Sql offset must be 0 or greater');
        }
        $this->offset = $offset;
        return $this;
    }

    public function first(): ?array
    {
        $this->limit(1);
        return $this->db->execute($this->buildQuery())->fetchOne();
    }

    public function all(): \Iterator
    {
        return $this->db->execute($this->buildQuery())->fetchAll();
    }

    /**
     * Valid SQL statement with PDO compatible replacement tokens
     *
     * @return string
     */
    public function toSql(): string
    {
        return $this->buildQuery()->toSql();
    }

    private function buildQuery(): SqlFragment
    {
        return new MultiFragment(
            ' ',
            $this->getSelectClause(),
            $this->getWhereClause(),
            $this->getOrderByClause(),
            $this->getLimitClause(),
            $this->getOffsetClause()
        );
    }

    /**
     * Array of values to use for the tokens
     *
     * @return string[]
     */
    public function getParameters(): array
    {
        return $this->buildQuery()->getParameters();
    }

    private function getSelectClause(): SqlFragment
    {
        return new RawFragment("SELECT {$this->fields} FROM {$this->table}");
    }

    private function getLimitClause(): SqlFragment
    {
        if ($this->limit < 0) {
            return new RawFragment('');
        }
        return new RawFragment("LIMIT $this->limit");
    }

    private function getOffsetClause(): SqlFragment
    {
        if ($this->offset === 0) {
            return new RawFragment('');
        }
        return new RawFragment("OFFSET $this->offset");
    }

    private function getOrderByClause(): SqlFragment
    {
        if (empty($this->sorts)) {
            return new RawFragment('');
        }
        return new RawFragment('ORDER BY ' . implode(',', $this->sorts));
    }
}