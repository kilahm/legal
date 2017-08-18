<?php

use Phinx\Migration\AbstractMigration;

class CreateUserTable extends AbstractMigration
{
    const TABLE = 'user';
    const CREATE_SQL = <<<SQL
CREATE TABLE "user"
(
  "name"     VARCHAR(255),
  "email"    VARCHAR(255) PRIMARY KEY,
  "password" TEXT,
  "roles"     VARCHAR(32)[]
)
SQL;


    public function up()
    {
        if ($this->hasTable(self::TABLE)) {
            return;
        }
        $this->execute(self::CREATE_SQL);
    }

    public function down()
    {
        if (!$this->hasTable(self::TABLE)) {
            return;
        }
        $this->dropTable(self::TABLE);
    }
}
