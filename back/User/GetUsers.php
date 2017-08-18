<?php
declare(strict=1);

namespace App\User;

use App\Core\ResponseFactory;

class GetUsers
{
    /** @var Repository */
    private $repository;

    public function __construct(Repository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke()
    {
        return ResponseFactory::json(['users' => $this->repository->fetchUserByEmail('')]);
    }
}