<?php
declare(strict_types=1);

namespace App\Auth\Jwt;

use App\User\User;

interface ParseResult
{
    public function isError(): bool;

    /**
     * Suggest HTTP status for response
     */
    public function getSuggestedHttpStatus(): int;

    /**
     * User facing error message
     */
    public function getErrorMessage(): string;

    /**
     * Array of JSON serializable values to provide extra error information
     */
    public function getErrorContext(): array;

    /**
     * Return the user embedded in the JWT, if it exists
     */
    public function getUser(): ?User;
}