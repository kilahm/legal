<?php
declare(strict_types=1);

namespace App\Error;

use League\Container\ServiceProvider\AbstractServiceProvider;
use Psr\Log\LoggerInterface;

class Provider extends AbstractServiceProvider
{
    protected $provides = [
        Middleware::class,
    ];

    public function register()
    {
        $this->container->share(Middleware::class)->withArgument(LoggerInterface::class);
    }
}