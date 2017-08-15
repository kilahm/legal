<?php

namespace App\Auth;

use App\Core\ResponseFactory;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class PostLogin
{
    /** @var LoginRepository */
    private $repository;

    public function __construct(LoginRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(ServerRequestInterface $request, array $body): ResponseInterface
    {
        return ResponseFactory::json(['jwt' => 'somejwt', 'request' => $body]);
    }
}