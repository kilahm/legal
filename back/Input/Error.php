<?php
declare(strict_types=1);

namespace App\Input;

class Error
{
    /** @var string */
    private $message;

    /** @var array */
    private $context;

    public function __construct(string $message, array $context)
    {
        $this->message = $message;
        $this->context = $context;
    }

    public function getMessage(): string
    {
        return $this->message;
    }

    public function getContext(): array
    {
        return $this->context;
    }
}