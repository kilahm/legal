<?php
declare(strict_types=1);

namespace App\User;

use App\Persistence\Db;
use League\Container\ServiceProvider\AbstractServiceProvider;

class Provider extends AbstractServiceProvider
{
    protected $provides = [
        PostUsersAuth::class
    ];

    public function register(): void
    {
        $this->container->share(PostUsersAuth::class)
            ->withArgument('JWT User')
            ->withArgument(Repository::class);
    }
}