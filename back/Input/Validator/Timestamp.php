<?php
declare(strict_types=1);

namespace App\Input\Validator;

use App\Input\Error;
use App\Input\ValidationResult;
use App\Input\Validator;

class Timestamp implements Validator
{
    public function validate($value): ValidationResult
    {
        $utc = new \DateTimeZone('UTC');
        if (is_numeric($value)) {
            return new ValidationResult(new \DateTimeImmutable("@$value", $utc), null);
        }
        try {
            return new ValidationResult(new \DateTimeImmutable($value, $utc), null);
        } catch (\Throwable $error) {
            return new ValidationResult(null, new Error($error->getMessage(), ['raw' => $value]));
        }
    }
}