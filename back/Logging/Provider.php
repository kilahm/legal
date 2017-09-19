<?php
declare(strict_types=1);

namespace App\Logging;

use App\Config\Env;
use League\Container\ServiceProvider\AbstractServiceProvider;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Psr\Log\LoggerInterface;

class Provider extends AbstractServiceProvider
{

    protected $provides = [
        LoggerInterface::class,
    ];

    public function register()
    {
        $this->container->share(
            LoggerInterface::class,
            function () {
                return new Logger('legal api', [new StreamHandler('php://stdout', Env::getLogLevel())]);
            }
        );
    }
}