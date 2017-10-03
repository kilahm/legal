<?php
declare(strict_types=1);

namespace App\User;

use App\Output\ResponseFactory;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class PostUsersAuth
{
    /** @var User|null */
    private $user;
    /** @var Repository */
    private $repository;

    public function __construct(?User $user, Repository $repository)
    {
        $this->user = $user;
        $this->repository = $repository;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        callable $next
    ): ResponseInterface {
        if(!$this->repository->adminExists()) {
            return $next($request, $response);
        }

        if($this->user === null) {
            return ResponseFactory::notLoggedIn();
        }

        if($this->user->hasRole(Role::ADMIN())) {
            return $next($request, $response);
        }

        return ResponseFactory::apiError(403, 'Only admins may create new users');
    }
}