<?php
declare(strict_types=1);

namespace App\Persistence\Query\Constraint;

use App\Util\Enum;

/**
 * @method static Op EQUAL
 * @method static Op IN
 * @method static Op GREATER_THAN
 * @method static Op GREATER_OR_EQUAL
 * @method static Op LESS_THAN
 * @method static Op LESS_OR_EQUAL
 */
final class Op
{
    use Enum;
    const EQUAL = '=';
    const IN = 'IN';
    const GREATER_THAN = '>';
    const GREATER_OR_EQUAL = '>=';
    const LESS_THAN = '<';
    const LESS_OR_EQUAL = '<=';
}