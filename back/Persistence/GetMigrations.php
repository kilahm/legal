<?php

namespace App\Persistence;

use App\Core\ResponseFactory;

class GetMigrations
{
    /** @var \PDO */
    private $db;

    public function __construct(\PDO $db)
    {
        $this->db = $db;
    }

    public function __invoke()
    {
        $statement = $this->db->prepare(<<<'SQL'
SELECT migration_name AS "name", extract(EPOCH FROM start_time) AS "start" FROM phinxlog
SQL
        );
        $statement->execute();
        $data = $statement->fetchAll(\PDO::FETCH_ASSOC);
        return ResponseFactory::json(['migrations' => $data]);
    }
}