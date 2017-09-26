<?php
declare(strict_types=1);

namespace App\Auth\Jwt;

use App\User\User;

class ErrorResult implements ParseResult
{
    /** @var int */
    private $status;
    /** @var string */
    private $reason;
    /** @var array */
    private $context;

    /**
     * ErrorResult constructor.
     * @param int $int
     * @param string $string
     * @param array $array
     */
    public function __construct(int $status, string $reason, array $context = [])
    {
        $this->status = $status;
        $this->reason = $reason;
        $this->context = $context;
    }

    public function isError(): bool
    {
        return true;
    }

    /**
     * Suggest HTTP status for response
     */
    public function getSuggestedHttpStatus(): int
    {
        return $this->status;
    }

    /**
     * User facing error message
     */
    public function getErrorMessage(): string
    {
        return $this->reason;
    }

    /**
     * Array of JSON serializable values to provide extra error information
     * @return array
     */
    public function getErrorContext(): array
    {
        return $this->context;
    }

    /**
     * Return the user embedded in the JWT, if it exists
     */
    public function getUser(): ?User
    {
        return null;
    }
}