<?php
declare(strict=1);

namespace App\User;

use App\Persistence\Db;

class Repository
{
    const TABLE = 'user';

    /** @var Db */
    private $db;

    public function __construct(Db $db)
    {
        $this->db = $db;
    }

    public function fetchUserByEmail(string $email): array
    {
        $results = $this->db->fetchAll('SELECT "name", "password", "role" FROM "user"');
        return iterator_to_array($results);
    }
}