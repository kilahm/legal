<?php
declare(strict_types=1);

namespace App\Input;

use App\Output\ResponseFactory;
use App\Util\Arr;
use Psr\Http\Message\ResponseInterface;

class Input
{
    /** @var Validator[] */
    private $validators;

    /** @var array */
    private $data = [];

    /** @var array */
    private $errors = [];

    public static function validate(array $data, array $validators, callable $validResponse): ResponseInterface
    {
        $input = new Input($data, $validators);
        if (empty($input->errors)) {
            return $validResponse($input->data);
        }
        return ResponseFactory::apiError(400, 'Invalid input', $input->errors);
    }

    public function __construct(array $data, array $validators)
    {
        $this->validators = $this->validateValidators($validators);
        $this->validateValidators($validators);
        $this->validateData($data);
    }

    public function isValid(): bool
    {
        return empty($this->errors);
    }

    public function getData(): array
    {
        return $this->data;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    private function validateValidators(array $validators): array
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
        return $validators;
    }

    private function validateData(array $data)
    {
        foreach ($this->validators as $key => $validator) {
            $result = $validator->validate(Arr::get($data, $key));
            $error = $result->getError();
            if ($error === null) {
                $this->data[$key] = $result->getValue();
                continue;
            }
            $this->errors[$key] = ['message' => $error->getMessage(), 'context' => $error->getContext()];
        }
    }
}