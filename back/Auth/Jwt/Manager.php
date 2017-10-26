<?php
declare(strict_types=1);

namespace App\Auth\Jwt;

use App\Auth\JwtParseResult;
use App\Auth\UnknownPassword;
use App\User\Role;
use App\User\User;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Signer;
use Lcobucci\JWT\Token;
use Lcobucci\JWT\ValidationData;
use Psr\Http\Message\ServerRequestInterface;

class Manager
{
    const FIVE_MINUTES_IN_SECONDS = 300;
    /** @var string */
    private $signingKey;
    /** @var Signer */
    private $signer;
    /** @var Parser */
    private $parser;
    /** @var Builder */
    private $builder;
    /** @var ValidationData */
    private $validationData;
    /** @var ParseResult[] */
    private $parseResults = [];

    public function __construct(string $signingKey, Signer $signer, ValidationData $validationData)
    {
        $this->signingKey = $signingKey;
        $this->signer = $signer;
        $this->builder = new Builder();
        $this->parser = new Parser();
        $this->validationData = $validationData;
    }

    public function buildTokenFromUser(User $user): string
    {
        $now = time();
        return $this->builder
            ->setIssuedAt($now)
            ->setNotBefore($now)
            ->setExpiration($now + self::FIVE_MINUTES_IN_SECONDS)
            ->set(
                'user',
                [
                    'name' => $user->getName(),
                    'email' => $user->getEmail(),
                    'roles' => array_map(
                        function (Role $role) {
                            return $role->getValue();
                        },
                        $user->getRoles()
                    ),
                ]
            )
            ->sign($this->signer, $this->signingKey)
            ->getToken()
            ->__toString();
    }

    public function parseRawToken(string $serialized): ParseResult
    {
        // Memoize result
        if (isset($this->parseResults[$serialized])) {
            return $this->parseResults[$serialized];
        }

        try {
            $token = $this->parser->parse($serialized);
        } catch (\Exception $e) {
            return $this->buildParseError($serialized, 400, 'Unable to parse JWT', ['parse error' => $e->getMessage()]);
        }

        if (!$this->validateSignature($token)) {
            return new ErrorResult(403, 'Rejected JWT signature');
        }

        // Only check default JWT validation here
        if (!$token->validate($this->validationData)) {
            return new ErrorResult(403, 'Rejected JWT claims');
        }

        $user = $this->extractUser($token);
        if ($user === null) {
            return new ErrorResult(403, 'Unable to determine user from JWT');
        }

        $result = new SuccessResult($user);
        $this->parseResults[$serialized] = $result;
        return $result;
    }

    public function buildTokenFromSerialized(string $serialized): Token
    {
        return $this->parser->parse($serialized);
    }

    private function validateSignature(Token $token): bool
    {
        try {
            return $token->verify($this->signer, $this->signingKey);
        } catch (\BadMethodCallException $e) {
            // No signature is the same as an invalid signature
            return false;
        }
    }

    private function extractUser(Token $token): ?User
    {
        $raw = $token->getClaim('user');
        if ($raw === null) {
            return null;
        }
        if (is_object($raw)) {
            $raw = (array)$raw;
        }
        return new User(
            $raw['email'],
            $raw['name'],
            new UnknownPassword(),
            array_map(
                function (string $rawRole): ?Role {
                    return Role::coerce($rawRole);
                },
                $raw['roles']
            )
        );
    }

    private function buildParseError(string $serialized, int $status, string $message, array $context = []): ParseResult
    {
        $result = new ErrorResult($status, $message, $context);
        $this->parseResults[$serialized] = $result;
        return $result;
    }

    public function buildTokenFromRequest(ServerRequestInterface $request): ParseResult
    {
        $authorization = $request->getHeaderLine('authorization');
        $parts = explode(' ', $authorization, 2);
        if (count($parts) !== 2 || $parts[0] !== 'Bearer') {
            return new ErrorResult(403, 'Authorization header missing or malformed');
        }
        return $this->parseRawToken($parts[1]);
    }
}
