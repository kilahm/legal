<?php
declare(strict_types=1);

namespace App\Persistence\Query;

use App\Persistence\Db;
use App\Util\Arr;

class Insert implements SqlFragment
{
    /** @var string */
    private $table;

    /** @var string[] */
    private $fields = [];

    /** @var SqlFragment[][] */
    private $data = [];

    /** @var Db */
    private $db;

    public function __construct(string $table, Db $db)
    {
        $this->table = Db::wrapToken($table);
        $this->db = $db;
    }

    public function fields(array $fields): self
    {
        $this->fields = [];
        foreach ($fields as $field) {
            if (!is_string($field)) {
                throw new \InvalidArgumentException('Insert field names must all be strings');
            }
            $this->fields[] = Db::wrapToken($field);
        }
        return $this;
    }

    public function record(array $values): self
    {
        $this->validateValueMap($values);
        $this->data[] = array_map(
            function ($value): SqlFragment {
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
            'INSERT INTO %s (%s) VALUES %s',
            $this->table,
            $this->renderFields(),
            $this->renderValues()
        );
    }

    public function getParameters(): array
    {
        return array_reduce(
            $this->data,
            function (array $parameters, array $value): array {
                return array_merge(
                    $parameters,
                    array_reduce(
                        $value,
                        function ($parameters, SqlFragment $value): array {
                            return array_merge($parameters, $value->getParameters());
                        },
                        []
                    )
                );
            },
            []
        );
    }

    public function execute(): void
    {
        if (empty($this->data)) {
            return;
        }
        $this->db->execute($this);
    }

    private function renderFields()
    {
        return implode('.', $this->fields);
    }

    private function renderValues()
    {
        $rows = array_map(
            function (array $row) {
                $values = array_map(
                    function (SqlFragment $value): string {
                        return $value->toSql();
                    },
                    $row
                );
                return '(' . implode(',', $values) . ')';
            },
            $this->data
        );
        return implode(',', $rows);
    }

    private function validateValueMap(array $values): array
    {
        if (empty($this->fields) && Arr::isAssoc($values)) {
            $this->fields(array_keys($values));
            return $values;
        }

        if (count($values) !== count($this->fields)) {
            throw new \InvalidArgumentException('Attempted to insert varying number of fields in one statement');
        }

        if (Arr::isAssoc($values)) {
            $values = array_reduce(
                $this->fields,
                function ($data, $field) use ($values) {
                    if (!isset($values[$field])) {
                        throw new \InvalidArgumentException('Insert data set missing field ' . $field);
                    }
                    $data[] = $values[$field];
                    return $data;
                }
            );
        }

        return $values;
    }
}