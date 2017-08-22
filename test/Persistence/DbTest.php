<?php
declare(strict_types=1);

namespace Test\Persistence;

use App\Persistence\Db;
use Iterator;
use PHPUnit\Framework\TestCase;

class DbTest extends TestCase
{
    public function provideValuesForSerialization(): Iterator
    {
        yield 'string' => [
            'in' => 'string',
            'out' => 'string'
        ];

        yield 'string with special array characters' => [
            'in' => '\\,',
            'out' => '\\,',
        ];

        yield 'null' => [
            'in' => null,
            'out' => null,
        ];

        yield 'bool' => [
            'in' => true,
            'out' => true,
        ];

        yield 'float' => [
            'in' => 1.23456789098765432,
            'out' => 1.23456789098765432,
        ];

        yield 'array' => [
            'in' => ['\\,', ['a', 'b'], 'c'],
            'out' => '{\\\\\\,,{a,b},c}',
        ];
    }

    /**
     * @dataProvider provideValuesForSerialization
     */
    public function testSerializeData($in, $expected): void
    {
        $this->assertSame($expected, Db::serialize($in));
    }
}