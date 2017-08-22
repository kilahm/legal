<?php
declare(strict_types=1);

namespace App\User;

use App\Output\ResponseFactory;

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