<?php
declare(strict_types=1);

namespace App\Auth;

class LoginRepository
{
    /** @var \PDO */
    private $connection;

    public function __construct(\PDO $connection)
    {
        $this->connection = $connection;
    }
}