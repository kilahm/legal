<?php
declare(strict=1);

namespace App\User;

use App\Persistence\Db;
use League\Container\ServiceProvider\AbstractServiceProvider;

class Provider extends AbstractServiceProvider
{
    protected $provides = [
        Repository::class,
        GetUsers::class
    ];

    public function register(): void
    {
        $this->container->share(Repository::class)->withArgument(Db::class);
        $this->container->share(GetUsers::class)->withArgument(Repository::class);
    }
}