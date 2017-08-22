<?php
declare(strict_types=1);

use App\Auth\Middleware as AuthMiddleware;
use App\Auth\PostLogin;
use App\Persistence\GetMigrations;
use App\User\GetUsers;
use App\User\PostUsers;
use League\Container\Container;
use Slim\App;

require dirname(__DIR__) . '/vendor/autoload.php';

$container = fill_container(new Container());
$app = set_global_middleware(set_routes(new App($container)));
$app->run();


function fill_container(Container $container): Container
{
    $container->addServiceProvider(\App\Core\Provider::class);
    $container->addServiceProvider(\App\Logging\Provider::class);
    $container->addServiceProvider(\App\Auth\Provider::class);
    $container->addServiceProvider(\App\Persistence\Provider::class);
    $container->addServiceProvider(\App\User\Provider::class);
    return $container;
}

function set_routes(App $app): App
{
    /** @var AuthMiddleware $authMiddleware */
    $app->group('/api', function () use ($app, $authMiddleware) {

        $app->post('/login', PostLogin::class);
        $app->get('/migrations', GetMigrations::class);
        $app->get('/users', GetUsers::class);
        $app->post('/users', PostUsers::class);
    });

    return $app;
}

function set_global_middleware(App $app): App
{
    $app->add(\App\Input\Middleware::class);
}
