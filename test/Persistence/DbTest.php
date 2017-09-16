<?php
declare(strict_types=1);

namespace Test\Persistence;

use App\Persistence\Db;
use App\Persistence\Query\RawFragment;
use App\Persistence\Query\SqlFragment;
use Iterator;
use PHPUnit\Framework\TestCase;

class DbTest extends TestCase
{
    public function provideValuesForSerialization(): Iterator
    {
        yield 'string' => [
            'in' => 'string',
            'out' => new RawFragment('?', ['string']),
        ];

        yield 'string with special array characters' => [
            'in' => '\\,',
            'out' => new RawFragment('?', ['\\,']),
        ];

        yield 'null' => [
            'in' => null,
            'out' => new RawFragment('?', [null]),
        ];

        yield 'bool' => [
            'in' => true,
            'out' => new RawFragment('?', [true]),
        ];

        yield 'float under precision' => [
            'in' => 1.234567890987,
            'out' => new RawFragment('?', [1.234567890987]),
        ];

        yield 'float over precision' => [
            'in' => 1.234567890987649,
            'out' => new RawFragment('?', [1.234567890987649]),
        ];

        yield 'array' => [
            'in' => ['\\,', ['a', 'b'], 'c'],
            'out' => new RawFragment('ARRAY[?,ARRAY[?,?],?]', ['\\,', 'a', 'b', 'c']),
        ];
    }

    /**
     * @dataProvider provideValuesForSerialization
     */
    public function testSerializeData($in, SqlFragment $expected): void
    {
        $serialized = Db::serialize($in);
        $this->assertSame($serialized->toSql(), $expected->toSql());
        $this->assertSame($serialized->getParameters(), $expected->getParameters());
    }

    public function provideArraysForDeserialization(): Iterator
    {
        yield 'empty' => [
            'in' => '{}',
            'expected' => [],
        ];

        yield 'simple string' => [
            'in' => '{abc}',
            'expected' => ['abc'],
        ];

        yield 'multiple simple strings' => [
            'in' => '{abc,def}',
            'expected' => ['abc', 'def'],
        ];

        yield 'include space' => [
            'in' => '{abc, def}',
            'expected' => ['abc', ' def'],
        ];
        yield 'empty element' => [
            'in' => '{abc,,def}',
            'expected' => ['abc', '', 'def'],
        ];

        yield 'escaped comma' => [
            'in' => '{ab,c\\,d}',
            'expected' => ['ab', 'c,d'],
        ];

        yield 'escaped escape' => [
            'in' => '{ab\\\\,c}',
            'expected' => ['ab\\', 'c'],
        ];

        yield 'combined escapes' => [
            'in' => '{ab\\\\\\,c}',
            'expected' => ['ab\\,c'],
        ];
    }

    /**
     * @dataProvider provideArraysForDeserialization
     */
    public function testDeserializeArray($in, $expected): void
    {
        $this->assertSame($expected, Db::unserializeArray($in));
    }

    public function testArrayMustHaveOpenBrace(): void
    {
        $this->expectException(\RuntimeException::class);
        Db::unserializeArray('abc,def}');
    }

    public function testArrayMustHaveCloseBrace(): void
    {
        $this->expectException(\RuntimeException::class);
        Db::unserializeArray('{abc,def}g');
    }
}