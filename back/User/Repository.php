<?php
declare(strict_types=1);

namespace App\User;

use App\Persistence\DataIntegretyError;
use App\Persistence\Db;
use InvalidArgumentException;
use PDO;

class Repository
{
    const TABLE = 'user';

    /** @var Db */
    private $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function fetchUserByEmail(string $email): ?User
    {
        $query = 'SELECT "email", "name", "password", "roles" FROM "user" WHERE "email" = ?';
        $results = $this->db->fetchOne($query, [$email]);
        if ($results === null) {
            return null;
        }

        try {
            $roles = array_map(function (string $role): Role {
                return Role::assert($role);
            }, Db::unseraliazeArray($results['roles']));
        } catch (InvalidArgumentException $e) {
            throw new DataIntegretyError('Invalid role stored in database');
        }
        return new User($results['email'], $results['name'], $results['password'], $roles);
    }

    public function createUser(User $user): void
    {
        $roles = array_map(function (Role $role) {
            return $role->getValue();
        }, $user->getRoles());
        $this->db->insertInto('user')
            ->record(
                [
                    'email' => $user->getEmail(),
                    'name' => $user->getName(),
                    'password' => $user->getPasswordHash(),
                    'roles' => $roles
                ]
            )
            ->execute();
    }
}