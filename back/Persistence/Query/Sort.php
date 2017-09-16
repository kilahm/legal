<?php
declare(strict_types=1);

namespace App\Persistence\Query;


use App\Util\Enum;

/**
 * @method static Sort ASCENDING()
 * @method static Sort DESCENDING()
 */
final class Sort
{
    use Enum;
    const ASCENDING = 'ASC';
    const DESCENDING = 'DESC';
}