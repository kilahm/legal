<?php
declare(strict_types=1);

namespace App\User;

use App\Auth\CheckPasswordResult;

class User
{
    /** @var string */
    private $email;

    /** @var string */
    private $name;

    /** @var string */
    private $password;

    /** @var Role[] */
    private $roles;

    public function __construct(string $email, string $name, string $password, array $roles)
    {
        $this->email = $email;
        $this->name = $name;
        $this->roles = $roles;
        $pInfo = password_get_info($password);
        if ($pInfo['algo'] === 0) {
            $this->password = password_hash($password, PASSWORD_DEFAULT);
        }
        $this->password = $password;
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPasswordHash(): string
    {
        return $this->password;
    }

    public function checkPassword(string $input): CheckPasswordResult
    {
        return new CheckPasswordResult(
            password_verify($input, $this->password),
            password_needs_rehash($this->password, PASSWORD_DEFAULT)
        );
    }
}