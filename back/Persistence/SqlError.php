<?php
declare(strict_types=1);

namespace App\Persistence;

class SqlError extends \LogicException
{
    public function __construct(array $errorInfo)
    {
        var_dump($errorInfo);
        exit();
    }
}