<?php
declare(strict_types=1);

use App\Auth\GetFreshToken;
use App\Auth\PostLogin;
use App\Config\GetState;
use App\Error\Middleware as ErrorMiddleware;
use App\Logging\Middleware as LoggingMiddleware;
use App\Meeting\GetMeetingList;
use App\Meeting\PostMeetings;
use App\Persistence\GetMigrations;
use App\User\GetUsers;
use App\User\PostUsers;
use League\Container\Container;
use Slim\App;

function build_app(?Container $container = null): App
{
    $container = $container ?: fill_container(new Container());
    $container->delegate(new \League\Container\ReflectionContainer());
    return set_global_middleware(set_routes(new App($container)));
}


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
            $app->post('/auth', PostLogin::class);

            $app->post('/users', PostUsers::class)
                ->add(\App\User\PostUsersAuth::class);

            // These require valid user
            $app->group(
                '',
                function () use ($app) {
                    $app->get('/users', GetUsers::class);
                    $app->get('/jwt', GetFreshToken::class);
                    $app->get('/meetings', GetMeetingList::class);
                }
            )->add(\App\Auth\Middleware\RequireValidUser::class);

            // These require contributing resident
            $app->group(
                '',
                function () use ($app) {
                    $app->post('/meetings', PostMeetings::class);
                }
            )->add(\App\Auth\Middleware\RequireContributingResident::class);

            // These require admin
            $app->group(
                '',
                function () use ($app) {
                    $app->get('/migrations', GetMigrations::class);
                }
            )->add(\App\Auth\Middleware\RequireAdmin::class);

            $app->any(
                '{.*}',
                function (\Slim\Http\Request $request) {
                    return \App\Output\ResponseFactory::apiError(
                        404,
                        'Unknown endpoint',
                        ['path' => $request->getUri()->__toString()]
                    );
                }
            );
        }
    );

    return $app;
}

function set_global_middleware(App $app): App
{
    $app->add(ErrorMiddleware::class);
    $app->add(LoggingMiddleware::class);
    return $app;
}
