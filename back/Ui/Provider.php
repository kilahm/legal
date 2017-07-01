<?php

namespace App\Ui;

use League\Container\ServiceProvider\AbstractServiceProvider;

class Provider extends AbstractServiceProvider
{
    protected $provides = [
        Handler::class,
    ];

    public function register()
    {
        $this->container->share(Handler::class);
    }
}