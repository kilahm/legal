<?php
declare(strict_types=1);

namespace App\Logging;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Log\LoggerInterface;

class Middleware
{
    /** @var LoggerInterface */
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
        $this->logger->debug('Created logging middleware');
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        callable $next
    ): ResponseInterFace {
        $this->logger->info(
            'Handling request',
            [
                'uri' => $request->getUri()->__toString()
            ]
        );
        return $next($request, $response);
    }
}