<?php
declare(strict=1);

namespace App\User;

class User
{
    /** @var int */
    private $id;

    /** @var string */
    private $name;

    /** @var Role[] */
    private $roles;

    public function __construct(int $id, string $name, array $roles)
    {
        $this->id = $id;
        $this->name = $name;
        $this->roles = $roles;
    }

    /**
     * @return string
     */
    public function getRoles(): string
    {
        return $this->roles;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }
}