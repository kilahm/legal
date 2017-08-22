<?php
declare(strict_types=1);

namespace App\Input;

class Struct implements Validator
{

    public static function fromArray(array $validators): Struct
    {
        foreach ($validators as $k => $validator) {
            if (!is_string($k)) {
                throw new \InvalidArgumentException(
                    'The keys associated with the validators indicate the field name, and must therefore be strings'
                );
            }
            if (!$validator instanceof Validator) {
                throw new \InvalidArgumentException(
                    'Only instances of App\Input\Validator may be used as input validators'
                );
            }
        }
    }

    public function validate(string $key, $value): ValidationResult
    {
    }
}