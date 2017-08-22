<?php
declare(strict_types=1);

namespace App\Auth;

use App\Output\ResponseFactory;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Signer;
use Lcobucci\JWT\Token;
use Lcobucci\JWT\ValidationData;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

abstract class Middleware
{
    /** @var Signer */
    private $signer;

    /** @var string */
    private $signingKey;

    /**
     * If the token is invalid, returns a string with an explanatory message.
     * If the token is valid, returns null.
     */
    protected abstract function validatePayload(array $token): ?string;

    public function __construct(Signer $signer, string $signingKey)
    {
        $this->signer = $signer;
        $this->signingKey = $signingKey;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        callable $next
    ): ResponseInterFace {
        try {
            $token = $this->extractJwtFromRequest($request);
        } catch (\Exception $e) {
            return ResponseFactory::apiError(400, 'Unable to parse JWT', ['parse error' => $e->getMessage()]);
        }

        if ($token === null) {
            return ResponseFactory::apiError(403, 'Authorization header missing or malformed');
        }

        try {
            $token->verify($this->signer, $this->signingKey);
        } catch (\Exception $e) {
            return ResponseFactory::apiError(403, 'Rejected JWT signature');
        }

        // Only check default JWT validation here
        if (!$token->validate(new ValidationData())) {
            return ResponseFactory::apiError(403, 'Rejected JWT claims');
        }

        $payload = json_decode($token->getPayload(), true);
        $payload = is_array($payload) ? $payload : [];
        $response = $this->validatePayload($payload);
        if (is_string($response)) {
            return ResponseFactory::apiError(403, $response);
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