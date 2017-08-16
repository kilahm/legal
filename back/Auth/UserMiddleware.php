<?php

namespace App\Auth;

use App\Core\ResponseFactory;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Token;
use Lcobucci\JWT\ValidationData;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class UserMiddleware
{
    /** @var ValidationData */
    private $validationData;

    public function __construct(ValidationData $validationData)
    {
        $this->validationData = $validationData;
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param $next
     * @return ResponseInterface
     */
    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, $next): ResponseInterFace
    {
        try {
            $token = $this->extractJwtFromRequest($request);
        } catch (\Exception $e) {
            return ResponseFactory::apiError(400, 'Unable to parse JWT', ['parse error' => $e->getMessage()]);
        }

        if ($token === null) {
            return ResponseFactory::apiError(403, 'Authorization header missing or malformed');
        }

        if (!$token->validate($this->validationData)) {
            return ResponseFactory::apiError(403, 'Rejected JWT claims');
        }

        return $next($request, $response);
    }

    private function extractJwtFromRequest(ServerRequestInterface $request): ?Token
    {
        $authorization = $request->getHeaderLine('authorization');
        $parts = explode(' ', $authorization, 2);
        if (count($parts) !== 2 || $parts[0] !== 'Bearer') {
            return null;
        }

        return (new Parser())->parse($parts[1]);
    }
}