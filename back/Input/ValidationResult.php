<?php
declare(strict_types=1);

namespace App\Input;

class ValidationResult
{
    private $finalValue;

    /** @var null|Error */
    private $error;

    public function __construct($finalValue, ?Error $error)
    {
        $this->finalValue = $finalValue;
        $this->error = $error;
    }

    public function isValid(): bool
    {
        return $this->error === null;
    }

    public function isInvalid(): bool
    {
        return $this->error !== null;
    }

    public function getError(): ?Error
    {
        return $this->error;
    }

    public function getValue()
    {
        return $this->finalValue;
    }
}