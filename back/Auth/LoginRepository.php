<?php

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