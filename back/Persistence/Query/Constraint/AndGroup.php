<?php
declare(strict_types=1);

namespace App\Persistence\Query\Constraint;

class AndGroup extends Group
{
    const COMBINATOR = 'AND';
}