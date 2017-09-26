<?php
declare(strict_types=1);

use App\Auth\MiddlewareFactory as AuthMiddlewareFactory;
use App\Auth\PostLogin;
use App\Config\GetState;
use App\Error\Middleware as ErrorMiddleware;
use App\Persistence\GetMigrations;
use App\User\GetUsers;
use League\Container\Container;
use Slim\App;

require dirname(__DIR__) . '/vendor/autoload.php';

$container = fill_container(new Container());
$app = set_global_middleware(set_routes(new App($container), $container->get(AuthMiddlewareFactory::class)));
$app->run();


function fill_container(Container $container): Container
{
    $container->addServiceProvider(\App\Core\Provider::class);
    $container->addServiceProvider(\App\Logging\Provider::class);
    $container->addServiceProvider(\App\Auth\Provider::class);
    $container->addServiceProvider(\App\Persistence\Provider::class);
    $container->addServiceProvider(\App\User\Provider::class);
    $container->addServiceProvider(\App\Error\Provider::class);
    return $container;
}

function set_routes(App $app): App
{
    $app->group(
        '/api',
        function () use ($app) {

            // These require no auth
            $app->get('/state', GetState::class);
            $app->post('/login', PostLogin::class);

            // This uses custom auth
            $app->post('/user', \App\User\PostUsers::class);

            // These require valid user
            $app->group(
                '',
                function () use ($app) {
                    $app->get('/users', GetUsers::class);
                }
            )->add(\App\Auth\Middleware\RequireValidUser::class);

            // These require admin
            $app->group(
                '',
                function () use ($app) {
                    $app->get('/migrations', GetMigrations::class);
                }
            )->add(\App\Auth\Middleware\RequireAdmin::class);
        }
    );

    return $app;
}

function set_global_middleware(App $app): App
{
    $app->add(ErrorMiddleware::class);
    return $app;
}
