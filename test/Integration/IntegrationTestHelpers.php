<?php
declare(strict_types=1);

namespace Test\Integration;

use App\Config\Env;
use League\Container\Container;
use Monolog\Handler\TestHandler;
use Monolog\Logger;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Log\LoggerInterface;
use Slim\App;
use Slim\Http\Headers;
use Slim\Http\Request;
use Slim\Http\Uri;
use Symfony\Component\Process\Process;

trait IntegrationTestHelpers
{
    /** @var null|Container */
    private $container;
    /** @var null|TestHandler */
    private $logs;
    /** @var null|App */
    private $app;

    private function projectPath(): string
    {
        return dirname(dirname(__DIR__));
    }

    private function resetApplication(): void
    {
        $this->setUpEnvironment();
        $this->createApplication();
        $this->setUpLogging();
        $this->setUpDatabase();
    }

    private function createApplication(): void
    {
        $this->container = fill_container(new Container());
        $this->app = build_app($this->container);
    }

    private function setUpEnvironment(): void
    {
        Env::set('DB.DRIVER', 'pgsql');
        Env::set('DB.HOST', 'db');
        Env::set('DB.PORT', '5432');
        Env::set('DB.SCHEMA', 'integration');
        Env::set('DB.USER', 'root');
        Env::set('DB.PASSWORD', 'secret');
        Env::set('JWT.SIGNING_KEY', 'supersecret');
    }

    private function setUpLogging(): void
    {
        $this->logs = new TestHandler();
        $this->container->add(LoggerInterface::class, new Logger('integration test', [$this->logs]));
    }

    private function post(string $path, array $body, array $headers = [], array $server = []): ResponseInterface
    {
        $body = new JsonBody($body);
        $headers['Content-Type'] = 'application/json';
        $headers['Accepts'] = 'application/json';
        $request = new Request('POST', Uri::createFromString($path), new Headers($headers), [], $server, $body);
        return $this->handleRequest($request);
    }

    private function handleRequest(Request $request): ResponseInterface
    {
        $this->container->add(ServerRequestInterface::class, $request);
        return $this->app->run(true);
    }

    private function setUpDatabase(): void
    {
        $this->rollBack();
        $this->migrate();
    }

    private function rollBack(): void
    {
        /** @var \PDO $db */
        $db = $this->container->get(\PDO::class);
        $db->exec('DROP SCHEMA "public" CASCADE');
        $db->exec('CREATE SCHEMA "public"');
    }

    private function migrate(): void
    {
        $phinx = $this->getPathToPhinx();
        $proc = new Process([$phinx, 'migrate', '-e', 'integration'], $this->projectPath());
        $proc->run();
        if ($proc->getExitCode() !== 0) {
            throw new \RuntimeException('Phinx migrate failed - ' . PHP_EOL . $proc->getOutput());
        }
    }

    private function getPathToPhinx(): string
    {
        $phinx = $this->projectPath() . '/vendor/bin/phinx';
        if (!is_file($phinx)) {
            throw new \RuntimeException('Phinx script is not available - ' . $phinx);
        }
        return $phinx;
    }
}