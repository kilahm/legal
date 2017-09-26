<?php

namespace App\User;

use App\Auth\CheckPasswordResult;

interface Password
{
    /**
     * Perform a timing attack resistant check on a raw unhashed password
     */
    public function check(string $rawPassword): CheckPasswordResult;

    /**
     * Fetch the password hash, including salt and hash method
     */
    public function getHash(): string;

    /**
     * Flag indicating the password is valid
     */
    public function isValid(): bool;
}