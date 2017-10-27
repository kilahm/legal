<?php
declare(strict_types=1);

namespace App\Core;

use App\Output\ResponseFactory;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Handlers\AbstractHandler;

class NotFound extends AbstractHandler
{
    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        // TODO: improve on slims content type detection
        $accepts = $this->determineContentType($request);
        $path = $request->getUri()->getPath();

        // If UA wanted json and the path starts with api, assume it's expecting an api response
        if (substr($path, 0, 4) === '/api' && strpos($accepts, 'json') !== false) {
            return ResponseFactory::apiError(404, 'This endpoint does not exist');
        }

        // This may be a route handled by the SPA, so just return index.html
        return ResponseFactory::file(__DIR__ . '/index.html', 'text/html');
    }
}