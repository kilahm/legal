<?php
declare(strict_types=1);

namespace App\Auth;

use App\User\Password;

class UnknownPassword implements Password
{
    /**
     * Perform a timing attack resistant check on a raw unhashed password
     */
    public function check(string $rawPassword): CheckPasswordResult
    {
        throw new \LogicException('Password is not known in this context');
    }

    /**
     * Fetch the password hash, including salt and hash method
     */
    public function getHash(): string
    {
        throw new \LogicException('Password is not known in this context');
    }

    /**
     * Flag indicating the password is valid
     */
    public function isValid(): bool
    {
        return false;
    }
}