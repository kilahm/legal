<?php
declare(strict_types=1);

namespace Test\Unit\Persistence\Query\Constraint;

use App\Persistence\Query\Constraint\Builder;
use App\Persistence\Query\Constraint\Op;
use App\Persistence\Query\RawFragment;
use PHPUnit\Framework\TestCase;

class BuilderTest extends TestCase
{
    public function testBuilderDoesNotGroupSingleConstraint(): void
    {
        $where = (new Builder())
            ->addCondition('a', Op::LESS_THAN(), 'b')
            ->getWhere();
        $this->assertSame('WHERE "a" < ?', $where->toSql());
        $this->assertSame(['b'], $where->getParameters());
    }

    public function testBuilderDefaultsToAndGroup(): void
    {
        $where = (new Builder())
            ->addCondition('a', Op::LESS_THAN(), 'b')
            ->addCondition('c', Op::EQUAL(), 'd')
            ->getWhere();
        $this->assertSame('WHERE ("a" < ? AND "c" = ?)', $where->toSql());
        $this->assertSame(['b', 'd'], $where->getParameters());
    }

    public function testBuilderAllowsOrGroup(): void
    {
        $where = (new Builder())
            ->addCondition('a', Op::LESS_THAN(), 'b')
            ->addCondition('c', Op::EQUAL(), 'd')
            ->declareOr()
            ->getWhere();
        $this->assertSame('WHERE ("a" < ? OR "c" = ?)', $where->toSql());
    }

    public function testBuilderAllowsAndGroup(): void
    {
        $where = (new Builder())
            ->addCondition('a', Op::LESS_THAN(), 'b')
            ->addCondition('c', Op::EQUAL(), 'd')
            ->declareOr()
            ->declareAnd()
            ->getWhere();
        $this->assertSame('WHERE ("a" < ? AND "c" = ?)', $where->toSql());
    }

    public function testBuilderCombinesGroupsOfSameType(): void
    {
        $where = (new Builder())
            ->addCondition('a', Op::LESS_THAN(), 'b')
            ->subGroup(
                function (Builder $builder): void {
                    $builder
                        ->addCondition('c', Op::EQUAL(), 'd')
                        ->addCondition('d', Op::EQUAL(), 'e');
                }
            )
            ->getWhere();
        $this->assertSame('WHERE ("a" < ? AND "c" = ? AND "d" = ?)', $where->toSql());
    }

    public function testBuilderAllowsSubGroups(): void
    {
        $where = (new Builder())
            ->addCondition('a', Op::LESS_THAN(), 'b')
            ->subGroup(
                function (Builder $builder): void {
                    $builder
                        ->declareOr()
                        ->addCondition('c', Op::EQUAL(), 'd')
                        ->addCondition('e', Op::EQUAL(), 'f');
                }
            )
            ->getWhere();
        $this->assertSame('WHERE ("a" < ? AND ("c" = ? OR "e" = ?))', $where->toSql());
        $this->assertSame(['b', 'd', 'f'], $where->getParameters());
    }

    public function testbuilderAllowsRawFragments(): void
    {
        $where = (new Builder())
            ->addCondition('a', Op::LESS_THAN(), 'b')
            ->addRawCondition(new RawFragment('abcdefg', ['a', 'b']))
            ->getWhere();
        $this->assertSame('WHERE ("a" < ? AND abcdefg)', $where->toSql());
        $this->assertSame(['b', 'a', 'b'], $where->getParameters());
    }
}