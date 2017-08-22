<?php
declare(strict_types=1);

namespace App\User;

use App\Util\Enum;

final class Role
{
    use Enum;

    const RESIDENT = 'resident';
    const ADMIN = 'admin';
    const CHILD = 'child';
}