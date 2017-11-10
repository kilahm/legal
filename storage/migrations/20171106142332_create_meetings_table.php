<?php

use Phinx\Migration\AbstractMigration;

class CreateMeetingsTable extends AbstractMigration
{
    const TABLE = 'meeting';
    const CREATE_SQL = <<<SQL
CREATE TABLE "meeting"
(
  "id"    UUID PRIMARY KEY,
  "start" INTEGER
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
        if ($this->hasTable(self::TABLE)) {
            $this->dropTable(self::TABLE);
        }
    }
}
