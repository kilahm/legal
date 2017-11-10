<?php
declare(strict_types=1);

namespace App\User;

use App\Util\Enum;

/**
 * @method static Role RESIDENT
 * @method static Role CONTRIBUTING
 * @method static Role ADMIN
 */
final class Role
{
    use Enum;

    const RESIDENT = 'resident';
    const CONTRIBUTING = 'contributing';
    const ADMIN = 'admin';
}