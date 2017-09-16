<?php
declare(strict_types=1);

namespace App\Persistence\Query;

interface SqlFragment
{
    /**
     * Valid SQL statement with PDO compatible replacement tokens
     *
     * @return string
     */
    public function toSql(): string;

    /**
     * Array of values to use for the tokens
     *
     * @return string[]
     */
    public function getParameters(): array;
}