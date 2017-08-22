<?php
declare(strict_types=1);

namespace App\Util;

use Slim\Http\Request;

trait ControllerUtils
{
    private function extractFromRequest(array $keys, Request $request): array
    {
        return array_map(
            function ($key) use ($request) {
                return $request->getParsedBodyParam($key);
            },
            $keys
        );
    }
}