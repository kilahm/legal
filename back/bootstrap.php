<?php

use League\Container\Container;

require dirname(__DIR__) . '/vendor/autoload.php';

$container = fill_container(new Container());
$app = set_routes(new \Slim\App($container));
$app->run();


function fill_container(Container $container): Container
{
    $container->addServiceProvider(\App\Core\Provider::class);
    $container->addServiceProvider(\App\Ui\Provider::class);
    return $container;
}

function set_routes(\Slim\App $app): \Slim\App
{
    return $app;
}
