<?php
declare(strict=1);

namespace App\Persistence;

class QueryBuilder
{
    /** @var string */
    private $table;

    public function __construct(string $table)
    {
        $this->table = $table;
    }
}