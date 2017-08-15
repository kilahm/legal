<?php

use Phinx\Migration\AbstractMigration;

class CreateUserTable extends AbstractMigration
{
    const TABLE = 'user';

    public function up()
    {
        if ($this->hasTable(self::TABLE)) {
            return;
        }
        $this->table(self::TABLE)
            ->create();
    }

    public function down()
    {
        if (!$this->hasTable(self::TABLE)) {
            return;
        }
        $this->dropTable(self::TABLE);
    }
}
