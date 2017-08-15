<?php

use League\Container\Container;

require dirname(__DIR__) . '/vendor/autoload.php';

$container = fill_container(new Container());
$app = set_routes(new \Slim\App($container));
$app->run();


function fill_container(Container $container): Container
{
    $container->addServiceProvider(\App\Core\Provider::class);
    $container->addServiceProvider(\App\Logging\Provider::class);
    $container->addServiceProvider(\App\Auth\Provider::class);
    $container->addServiceProvider(\App\Persistence\Provider::class);
    return $container;
}

function set_routes(\Slim\App $app): \Slim\App
{
    $app->group('/api', function() use ($app) {
        $app->post('/login', \App\Auth\PostLogin::class);
        $app->get('/migrations',\App\Persistence\GetMigrations::class);
    });

    return $app;
}
