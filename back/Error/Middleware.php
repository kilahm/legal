<?php
declare(strict_types=1);

namespace App\Error;

use App\Output\ResponseFactory;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Log\LoggerInterface;

class Middleware
{
    /** @var LoggerInterface */
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function __invoke(RequestInterface $request, ResponseInterface $response, callable $next): ResponseInterface
    {
        try {
            return $next($request, $response);
        } catch (\Throwable $e) {
            $this->logger->critical(
                'Uncaught throwable',
                [
                    'message' => $e->getMessage(),
                    'code' => $e->getCode(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine()
                ]
            );
            $this->logger->debug('Stack for uncaught throwable', $e->getTrace());
            return ResponseFactory::apiError(500, 'unexpected error');
        }
    }
}