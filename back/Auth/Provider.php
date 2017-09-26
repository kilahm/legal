<?php
declare(strict_types=1);

namespace App\Auth;

use App\Auth\Jwt\Manager;
use App\Config\Env;
use App\Config\GetState;
use App\User\Repository;
use Lcobucci\JWT\Signer;
use Lcobucci\JWT\ValidationData;
use League\Container\Argument\RawArgument;
use League\Container\ServiceProvider\AbstractServiceProvider;
use Psr\Http\Message\ServerRequestInterface;

class Provider extends AbstractServiceProvider
{
    protected $provides = [
        PostLogin::class,
        Signer::class,
        Manager::class,
        Middleware::class,
        GetState::class,
        'JWT User',
    ];

    public function register()
    {
        $this->container->share(PostLogin::class)
            ->withArgument(Repository::class)
            ->withArgument(Manager::class);

        $this->container->share(Signer::class, Signer\Hmac\Sha256::class);

        $this->container->share(Manager::class)->withArguments(
            [
                new RawArgument(Env::getJwtSigningKey()),
                Signer::class,
                ValidationData::class,
            ]
        );

        // TODO: probably nothing else to validate here.  I'm really using this as a session token. :(
        $this->container->share(ValidationData::class);
        $this->container->share(Middleware::class)
            ->withArgument(Manager::class)
            ->withArgument(ValidationData::class);

        $this->container->share(
            'JWT User',
            function () {
                /** @var Manager $manager */
                $manager = $this->container->get(Manager::class);
                /** @var ServerRequestInterface $request */
                $request = $this->container->get(ServerRequestInterface::class);
                return $manager->buildTokenFromRequest($request)->getUser();
            }
        );

        $this->container->share(GetState::class)
            ->withArgument(Repository::class);
    }
}