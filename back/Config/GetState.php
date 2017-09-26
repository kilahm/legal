<?php
declare(strict_types=1);

namespace App\Config;

use App\Output\ResponseFactory;
use App\User\Repository;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class GetState
{
    /** @var Repository */
    private $userRepo;

    public function __construct(Repository $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        return ResponseFactory::json(['hasAdmin' => $this->userRepo->adminExists()]);
    }
}