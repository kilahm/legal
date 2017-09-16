<?php
declare(strict_types=1);

namespace App\Auth;

use App\User\Role;
use App\Util\Arr;

class UserAuth extends Middleware
{
    protected function validatePayload(array $payload): ?string
    {
        $userRole = Role::coerce(Arr::get($payload, 'role'));
        if ($userRole === null) {
            return 'User role is not allowed';
        }
        return null;
    }
}