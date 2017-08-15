<?php

namespace App\Persistence;

use App\Config\Env;
use League\Container\ServiceProvider\AbstractServiceProvider;
use PDO;

class Provider extends AbstractServiceProvider
{
    protected $provides = [
        PDO::class,
        GetMigrations::class,
    ];

    public function register(): void
    {
        $this->container->share(PDO::class, function () {
            // TODO: build this from settings
            $driver = Env::get('DB.DRIVER');
            $host = Env::get('DB.HOST');
            $port = Env::get('DB.PORT');
            $schema = Env::get('DB.SCHEMA');
            $user = Env::get('DB.USER');
            $pass = Env::get('DB.PASSWORD');

            $dsn = "$driver:host=$host;port=$port;dbname=$schema";
            return new PDO($dsn, $user, $pass);
        });

        $this->container->share(GetMigrations::class, function () {
            return new GetMigrations($this->container->get(PDO::class));
        });
    }
}