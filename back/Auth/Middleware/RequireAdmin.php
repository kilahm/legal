<?php
declare(strict_types=1);

namespace App\Auth\Middleware;

use App\Output\ResponseFactory;
use App\User\Role;
use App\User\User;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class RequireAdmin
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
        if ($this->user->hasRole(Role::ADMIN())) {
            return $next($request, $response);
        }
        return ResponseFactory::apiError(403, 'Must be an admin');
    }
}

