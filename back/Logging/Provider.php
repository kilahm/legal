<?php
declare(strict_types=1);

namespace App\Logging;

use League\Container\ServiceProvider\AbstractServiceProvider;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Psr\Log\LoggerInterface;

class Provider extends AbstractServiceProvider
{

    protected $provides = [
        LoggerInterface::class,
    ];

    /**
     * Use the register method to register items with the container via the
     * protected $this->container property or the `getContainer` method
     * from the ContainerAwareTrait.
     *
     * @return void
     */
    public function register()
    {
        $this->container->share(
            LoggerInterface::class,
            function () {
                return new Logger('legal api', [new StreamHandler(STDERR)]);
            }
        );
    }
}