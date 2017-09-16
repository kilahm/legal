<?php
declare(strict_types=1);

namespace App\Util;

use Slim\Http\Request;

trait ControllerUtils
{
    private function extractFromRequest(array $keys, Request $request): array
    {
        return array_reduce(
            $keys,
            function ($data, $key) use ($request) {
                $data[$key] = $request->getParsedBodyParam($key);
                return $data;
            },
            []
        );
    }
}