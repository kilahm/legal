<?php
declare(strict_types=1);

namespace App\Auth;

class CheckPasswordResult
{
    /** @var bool */
    private $match;

    /** @var bool */
    private $needsRehash;

    public function __construct(bool $match, bool $needsRehash)
    {
        $this->match = $match;
        $this->needsRehash = $needsRehash;
    }

    /**
     * @return bool
     */
    public function needsRehash(): bool
    {
        return $this->needsRehash;
    }

    /**
     * @return bool
     */
    public function isMatch(): bool
    {
        return $this->match;
    }
}