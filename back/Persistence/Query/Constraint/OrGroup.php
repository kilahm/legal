<?php
declare(strict_types=1);

namespace App\Persistence\Query\Constraint;

class OrGroup extends Group
{
    const COMBINATOR = 'OR';
}