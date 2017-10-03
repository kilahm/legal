<?php
declare(strict_types=1);

namespace Test\Unit\Persistence\Query;

use App\Persistence\Db;
use App\Persistence\Query\Constraint\Op;
use App\Persistence\Query\Update;
use PHPUnit\Framework\TestCase;

class UpdateTest extends TestCase
{
    /** @var Db|\PHPUnit_Framework_MockObject_MockObject */
    private $db;
    /** @var Update */
    private $update;

    public function setUp()
    {
        $this->db = $this->createMock(Db::class);
        $this->update = new Update('test table', $this->db);
    }

    public function testIncludesTableName()
    {
        $sql = $this->update->toSql();

        $this->assertStringStartsWith('UPDATE "test table" SET', $sql);
    }

    public function testSingleSimpleValue()
    {
        $sql = $this->update
            ->set(['test field' => 'test value'])
            ->toSql();
        $params = $this->update->getParameters();

        $this->assertContains('SET "test field"=?', $sql);
        $this->assertSame(['test value'], $params);
    }

    public function testMultipleSimpleValues()
    {
        $sql = $this->update
            ->set(
                [
                    'simple field' => 'simple value',
                    'again' => 'moar value',
                ]
            )
            ->toSql();
        $params = $this->update->getParameters();

        $this->assertContains('SET "simple field"=?,"again"=?', $sql);
        $this->assertSame(['simple value', 'moar value'], $params);
    }

    public function testArrayValue()
    {
        $sql = $this->update
            ->set(
                [
                    'array field' => ['a', 'b'],
                ]
            )
            ->toSql();
        $params = $this->update->getParameters();

        $this->assertContains('SET "array field"=ARRAY[?,?]', $sql);
        $this->assertSame(['a', 'b'], $params);
    }

    public function testIncludesWhereClause()
    {
        $sql = $this->update
            ->set(['field' => 'value'])
            ->where('field', Op::EQUAL(), 'other value')
            ->toSql();
        $params = $this->update->getParameters();

        $this->assertContains('WHERE "field" = ?', $sql);
        $this->assertSame(['value', 'other value'], $params);
    }
}