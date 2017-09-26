<?php
declare(strict_types=1);

namespace App\Auth;

use App\Auth\Jwt\Manager;
use App\Output\ResponseFactory;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class Middleware
{
    /** @var Manager */
    private $factory;

    public function __construct(Manager $factory)
    {
        $this->factory = $factory;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        callable $next
    ): ResponseInterFace {
        $result = $this->factory->buildTokenFromRequest($request);
        if ($result->isError()) {
            return ResponseFactory::apiError(
                $result->getSuggestedHttpStatus(),
                $result->getErrorMessage(),
                $result->getErrorContext()
            );
        }

        return $next($request, $response);
    }
}