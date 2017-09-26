<?php
declare(strict_types=1);

namespace App\Auth\Jwt;

use App\User\User;

class SuccessResult implements ParseResult
{
    /** @var User */
    private $user;

    /**
     * SuccessResult constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function isError(): bool
    {
        return false;
    }

    /**
     * Suggest HTTP status for response
     */
    public function getSuggestedHttpStatus(): int
    {
        return 200;
    }

    /**
     * User facing error message
     */
    public function getErrorMessage(): string
    {
        return '';
    }

    /**
     * Array of JSON serializable values to provide extra error information
     * @return array
     */
    public function getErrorContext(): array
    {
        return [];
    }

    /**
     * Return the user embedded in the JWT, if it exists
     */
    public function getUser(): ?User
    {
        return $this->user;
    }
}