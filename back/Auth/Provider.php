<?php

namespace App\Auth;

use League\Container\ServiceProvider\AbstractServiceProvider;

class Provider extends AbstractServiceProvider
{

    protected $provides = [
        PostLogin::class,
        LoginRepository::class,
    ];

    public function register()
    {
        $this->container->share(LoginRepository::class)->withArgument(\PDO::class);
        $this->container->share(PostLogin::class)->withArgument(LoginRepository::class);
    }
}