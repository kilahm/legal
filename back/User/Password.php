<?php
declare(strict_types=1);

namespace App\User;

use App\Auth\CheckPasswordResult;

class Password
{
    /** @var string */
    private $hash;

    public static function fromRaw(string $rawPassword): Password
    {
        return new Password(password_hash($rawPassword, PASSWORD_DEFAULT));
    }

    public function __construct(string $hash)
    {
        $pInfo = password_get_info($hash);
        if ($pInfo['algo'] === 0) {
            throw new \InvalidArgumentException('Invalid password hash');
        }
        $this->hash = $hash;
    }

    public function check(string $rawPassword): CheckPasswordResult
    {
        return new CheckPasswordResult(
            password_verify($rawPassword, $this->hash),
            password_needs_rehash($this->hash, PASSWORD_DEFAULT)
        );
    }

    public function getHash()
    {
        return $this->hash;
    }
}