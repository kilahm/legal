<?php
declare(strict_types=1);

namespace App\Input\Validator;

use App\Input\Error;
use App\Input\ValidationResult;
use App\Input\Validator;

class Email implements Validator
{
    public function validate($value): ValidationResult
    {
        if (filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return new ValidationResult($value, null);
        }

        return new ValidationResult(null, new Error('Expected valid email address', []));
    }
}