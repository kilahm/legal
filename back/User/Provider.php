<?php
declare(strict_types=1);

namespace App\User;

use App\Persistence\Db;
use League\Container\ServiceProvider\AbstractServiceProvider;

class Provider extends AbstractServiceProvider
{
    protected $provides = [
        Repository::class,
        GetUsers::class,
        PostUsers::class,
    ];

    public function register(): void
    {
        $this->container->share(Repository::class)->withArgument(Db::class);
        $this->container->share(GetUsers::class)->withArgument(Repository::class);
        $this->container->share(PostUsers::class)->withArgument(Repository::class);
    }
}