<?php
declare(strict_types=1);

namespace App\Persistence\Query;

use App\Persistence\Db;
use App\Util\Arr;

class Insert implements SqlQuery
{
    /** @var string */
    private $table;

    /** @var string[] */
    private $fields = [];

    /** @var string[][] */
    private $data = [];

    /** @var Db */
    private $db;

    public function __construct(string $table, Db $db)
    {
        $this->table = $table;
        $this->db = $db;
    }

    public function fields(array $fields): self
    {
        foreach ($fields as $field) {
            if (!is_string($field)) {
                throw new \InvalidArgumentException('Insert field names must all be strings');
            }
        }
        $this->fields = $fields;
        return $this;
    }

    public function record(array $values): self
    {
        if (empty($this->fields) && Arr::isAssoc($values)) {
            $this->fields(array_keys($values));
        }

        if (count($values) !== count($this->fields)) {
            throw new \InvalidArgumentException('Attempted to insert varying number of fields in one statement');
        }

        if (Arr::isAssoc($values)) {
            $values = array_reduce($this->fields, function ($data, $field) use ($values) {
                if (!isset($values[$field])) {
                    throw new \InvalidArgumentException('Insert data set missing field ' . $field);
                }
                $data[] = $values[$field];
                return $data;
            });
        }
        $this->data[] = array_map(
            function ($value): string {
                return Db::serialize($value);
            },
            $values
        );

        return $this;
    }

    public function toSql(): string
    {
        if (empty($this->data)) {
            throw new \RuntimeException('Cannot convert insert statement into SQL: No data to insert');
        }

        return sprintf(
        /** @lang text */
            'INSERT INTO ? (%s) VALUES %s',
            $this->renderFields(),
            $this->renderValues()
        );
    }

    public function getParameters(): array
    {
        return array_merge(
            [$this->table],
            $this->fields,
            Arr::flatten($this->data)
        );
    }

    public function execute(): void
    {
        $this->db->execute($this->toSql(), $this->getParameters());
    }

    private function renderFields()
    {
        return implode(',', array_fill(0, count($this->fields), '?'));
    }

    private function renderValues()
    {
        $rows = array_map(function (array $row) {
            return '(' . implode(',', array_fill(0, count($row), '?')) . ')';
        }, $this->data);
        return count($rows) > 1
            ? '(' . implode(',', $rows) . ')'
            : $rows[0];
    }
}