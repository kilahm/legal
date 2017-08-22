<?php
declare(strict_types=1);

namespace App\Output;

use App\User\Role;
use App\User\User;

class Renderer
{
    public static function renderUser(User $user): array
    {
        return [
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'roles' => array_map(
                function (Role $role) {
                    return $role->getValue();
                },
                $user->getRoles()
            ),
        ];
    }
}