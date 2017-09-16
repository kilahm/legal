<?php
declare(strict_types=1);

namespace App\Input\Validator;

use App\Input\Error;
use App\Input\ValidationResult;
use App\Input\Validator;
use App\Util\Arr;

class Vector implements Validator
{
    /** @var Validator */
    private $innerValidator;

    public function __construct(Validator $innerValidator)
    {
        $this->innerValidator = $innerValidator;
    }

    public function validate($value): ValidationResult
    {
        if (!is_array($value) || Arr::isAssoc($value)) {
            return new ValidationResult(null, new Error('Expected a vector of values', []));
        }

        $errors = [];
        foreach ($value as $k => $v) {
            $result = $this->innerValidator->validate($v);
            if ($result->isValid()) {
                $value[$k] = $result->getValue();
                continue;
            }
            $error = $result->getError();
            $errors[] = [
                'index' => $k,
                'error' => $error->getMessage(),
                'context' => $error->getContext(),
            ];
        }

        if (count($errors) > 0) {
            return new ValidationResult(null, new Error('Invalid element in vector', $errors));
        }

        return new ValidationResult($value, null);
    }
}