<?php
declare(strict_types=1);

namespace App\Auth\Middleware;

use App\Output\ResponseFactory;
use App\User\User;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class RequireValidUser
{
    /** @var null|User */
    private $user;

    public function __construct(?User $user)
    {
        $this->user = $user;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        callable $next
    ): ResponseInterFace {
        if ($this->user === null) {
            return ResponseFactory::notLoggedIn();
        }
        return $next($request, $response);
    }
}