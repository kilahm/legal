<?php
declare(strict_types=1);

namespace App\Input\Validator;

use App\Input\Error;
use App\Input\ValidationResult;
use App\Input\Validator;

class StringValue implements Validator
{
    public function validate($value): ValidationResult
    {
        if (is_string($value)) {
            return new ValidationResult($value, null);
        }
        return new ValidationResult(null, new Error('Expected a string', []));
    }
}