<?php
declare(strict_types=1);

namespace App\Persistence;

use App\Output\ResponseFactory;

class GetMigrations
{
    /** @var \PDO */
    private $db;

    public function __construct(Db $db)
    {
        $this->db = $db;
    }

    public function __invoke()
    {
        $sql = <<<'SQL'
SELECT migration_name AS "name", extract(EPOCH FROM start_time) AS "start" FROM phinxlog
SQL;
        $data = $this->db->execute(Db::raw($sql))->fetchAll();
        return ResponseFactory::json(['migrations' => iterator_to_array($data)]);
    }
}