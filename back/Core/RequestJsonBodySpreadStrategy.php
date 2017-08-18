<?php
declare(strict=1);

namespace App\Core;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class RequestJsonBodySpreadStrategy
{
    /**
     * Invoke a route callable.
     *
     * @param callable $callable The callable to invoke using the strategy.
     * @param ServerRequestInterface $request The request object.
     * @param ResponseInterface $response The response object.
     * @param array $routeArguments The route's placholder arguments
     *
     * @return ResponseInterface|string The response from the callable.
     */
    public function __invoke(
        callable $callable,
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $routeArguments
    ): ResponseInterface {
        $body = null;
        if(strpos($request->getHeaderLine('content-type'), 'json') !== false) {
            $body = json_decode($request->getBody()->getContents(), true);
        }
        return $callable($request, is_array($body) ? $body : [], ...$routeArguments);
    }
}