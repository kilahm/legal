<?php
declare(strict_types=1);

namespace App\Core;

use League\Container\ServiceProvider\AbstractServiceProvider;
use Psr\Http\Message\ServerRequestInterface;
use Slim\CallableResolver;
use Slim\Handlers\Error;
use Slim\Handlers\NotAllowed;
use Slim\Handlers\PhpError;
use Slim\Http\Environment;
use Slim\Http\Headers;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Router;

class Provider extends AbstractServiceProvider
{
    protected $provides = [
        'settings',
        'environment',
        'request',
        'response',
        'router',
        'foundHandler',
        'errorHandler',
        'phpErrorHandler',
        'notAllowedHandler',
        'callableResolver',
        'notFoundHandler',
    ];

    public function register(): void
    {
        $this->container->share(
            'settings',
            [
                'httpVersion' => '1.1',
                'responseChunkSize' => 4096,
                'outputBuffering' => 'append',
                'determineRouteBeforeAppMiddleware' => false,
                'displayErrorDetails' => true,
                'addContentLengthHeader' => true,
                'routerCacheFile' => dirname(__DIR__) . '/routes-cache.php',
            ]
        );

        $this->container->share('environment', new Environment($_SERVER));

        $this->container->share(
            'request',
            function () {
                return $this->container->get(ServerRequestInterface::class);
            }
        );
        $this->container->share(
            ServerRequestInterface::class,
            function () {
                return Request::createFromEnvironment($this->container->get('environment'));
            }
        );

        $this->container->share(
            'response',
            function () {
                $headers = new Headers(['Content-Type' => 'text/html; charset=UTF-8']);
                $response = new Response(200, $headers);

                return $response->withProtocolVersion($this->container->get('settings')['httpVersion']);
            }
        );

        $this->container->share(
            'router',
            function () {
                $routerCacheFile = false;
                if (isset($this->container->get('settings')['routerCacheFile'])) {
                    $routerCacheFile = $this->container->get('settings')['routerCacheFile'];
                }

                $router = new Router();
                if ($routerCacheFile && getenv('CACHE_ROUTES') === 'true') {
                    $router->setCacheFile($routerCacheFile);
                }
                if (method_exists($router, 'setContainer')) {
                    $router->setContainer($this->container);
                }

                return $router;
            }
        );

        $this->container->share(
            'foundHandler',
            function () {
                return new RequestSpreadStrategy();
            }
        );

        $this->container->share(
            'phpErrorHandler',
            function () {
                return new PhpError($this->container->get('settings')['displayErrorDetails']);
            }
        );

        $this->container->share(
            'errorHandler',
            function () {
                return new Error($this->container->get('settings')['displayErrorDetails']);
            }
        );

        $this->container->share(
            'notFoundHandler',
            function () {
                return new NotFound();
            }
        );

        $this->container->share(
            'notAllowedHandler',
            function () {
                return new NotAllowed();
            }
        );

        $this->container->share(
            'callableResolver',
            function () {
                return new CallableResolver($this->container);
            }
        );
    }
}
