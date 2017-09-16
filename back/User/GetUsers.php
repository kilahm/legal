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
        $users = [];
        foreach($this->repository->fetchAllUsers() as $user) {
            $users[] = $user;
        }
        return ResponseFactory::json(['users' => $user]);
    }
}