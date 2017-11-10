<?php
declare(strict_types=1);

namespace App\User;

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

    public function __construct(string $email, string $name, Password $password, array $roles)
    {
        $this->email = $email;
        $this->name = $name;
        $this->setRoles(...$roles);
        $this->password = $password;
    }

    /**
     * @return Role[]
     */
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

    public function getPassword(): Password
    {
        return $this->password;
    }

    public function withPassword(ValidPassword $password): self
    {
        $new = clone $this;
        $new->password = $password;
        return $new;
    }

    public function hasRole(Role $role)
    {
        return in_array($role, $this->roles);
    }

    private function setRoles(Role ...$roles): void
    {
        $this->roles = $roles;
    }
}