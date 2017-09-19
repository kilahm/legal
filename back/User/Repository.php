<?php
declare(strict_types=1);

namespace App\User;

use App\Persistence\DataIntegretyError;
use App\Persistence\Db;
use App\Persistence\Query\Constraint\Op;
use App\Persistence\SqlError;
use InvalidArgumentException;

class Repository
{
    const TABLE = 'user';

    /** @var Db */
    private $db;

    public function __construct(Db $db)
    {
        $this->db = $db;
    }

    public function fetchUserByEmail(string $email): ?User
    {
        $results = $this->db->fetch('user')
            ->fields('email', 'name', 'password', 'roles')
            ->where('email', Op::EQUAL(), $email)
            ->first();
        if ($results === null) {
            return null;
        }

        return $this->translateToUser($results);
    }

    public function createUser(User $user): void
    {
        $roles = array_map(
            function (Role $role) {
                return $role->getValue();
            },
            $user->getRoles()
        );
        $statement = $this->db->insertInto('user')
            ->record(
                [
                    'email' => $user->getEmail(),
                    'name' => $user->getName(),
                    'password' => $user->getPassword()->getHash(),
                    'roles' => $roles
                ]
            );
        try {
            $statement->execute();
        } catch (SqlError $e) {
            if ($e->getCode() === 23505) {
                // Duplicate key error
                throw new DuplicateEmail();
            }
            throw $e;
        }
    }

    public function updateUser(User $user)
    {
        $roles = array_map(
            function (Role $role) {
                return $role->getValue();
            },
            $user->getRoles()
        );
        $this->db->update('user')
            ->set(
                [
                    'name' => $user->getName(),
                    'password' => $user->getPassword(),
                    'roles' => $roles,
                ]
            )
            ->where('email', Op::EQUAL(), $user->getEmail())
            ->execute();
    }

    public function fetchAllUsers(): \Iterator
    {
        $data = $this->db
            ->fetch(self::TABLE)
            ->fields('name', 'password', 'email', 'roles')
            ->all();
        foreach ($data as $row) {
            yield $this->translateToUser($row);
        }
    }

    /**
     * @param $data
     * @return User
     */
    private function translateToUser(array $data): User
    {
        try {
            $roles = array_map(
                function (string $role): Role {
                    return Role::assert($role);
                },
                Db::unserializeArray($data['roles'])
            );
        } catch (InvalidArgumentException $e) {
            throw new DataIntegretyError('Invalid role stored in database');
        }
        try {
            $password = new Password($data['password']);
        } catch (InvalidArgumentException $e) {
            throw new DataIntegretyError('Invalid password hash stored in database');
        }
        return new User($data['email'], $data['name'], $password, $roles);
    }
}