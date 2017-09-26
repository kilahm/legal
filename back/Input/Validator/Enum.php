<?php
declare(strict_types=1);

namespace App\Input\Validator;

use App\Input\Error;
use App\Input\ValidationResult;
use App\Input\Validator;

class Enum implements Validator
{
    /** @var \ReflectionMethod */
    private $coerce;

    /** @var string[] */
    private $validValues;

    public function __construct(string $enumName)
    {
        try {
            $classMirror = new \ReflectionClass($enumName);
        } catch (\Throwable $e) {
            throw new \InvalidArgumentException('Unable to load enum to validate against');
        }

        $traitList = $classMirror->getTraitNames();
        if (!in_array(\App\Util\Enum::class, $traitList)) {
            throw new \InvalidArgumentException('Non-enum class passed to enum validator');
        }

        $this->coerce = $classMirror->getMethod('coerce');
        $this->validValues = $classMirror->getMethod('getRawValues')->invoke(null);
    }

    public function validate($value): ValidationResult
    {
        $result = $this->coerce->invoke(null, $value);
        if ($result !== null) {
            return new ValidationResult($result, null);
        }

        return new ValidationResult(
            null,
            new Error('Expected value from a list of values', ['valid values' => $this->validValues])
        );
    }
}