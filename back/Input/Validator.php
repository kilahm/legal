<?php
declare(strict_types=1);

namespace App\Input;

interface Validator
{
    public function validate($value): ValidationResult;
}