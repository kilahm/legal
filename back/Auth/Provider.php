<?php
declare(strict_types=1);

namespace App\Auth;

use App\Auth\Jwt\Manager;
use App\Auth\Middleware\RequireAdmin;
use App\Auth\Middleware\RequireContributingResident;
use App\Auth\Middleware\RequireValidUser;
use App\Config\Env;
use Lcobucci\JWT\Signer;
use Lcobucci\JWT\ValidationData;
use League\Container\Argument\RawArgument;
use League\Container\ServiceProvider\AbstractServiceProvider;
use Psr\Http\Message\ServerRequestInterface;

class Provider extends AbstractServiceProvider
{
    protected $provides = [
        Signer::class,
        Manager::class,
        'JWT User',
        RequireValidUser::class,
        RequireAdmin::class,
        RequireContributingResident::class,
    ];

    public function register()
    {
        $this->container->share(GetFreshToken::class)
            ->withArgument('JWT User')
            ->withArgument(Manager::class);

        $this->container->share(Signer::class, Signer\Hmac\Sha256::class);

        $this->container->share(Manager::class)
            ->withArgument(new RawArgument(Env::getJwtSigningKey()))
            ->withArgument(Signer::class)
            ->withArgument(ValidationData::class);

        // TODO: probably nothing else to validate here.  I'm really using this as a session token. :(
        $this->container->share(ValidationData::class);

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


        $this->container->share(RequireValidUser::class)
            ->withArgument('JWT User');
        $this->container->share(RequireAdmin::class)
            ->withArgument('JWT User');
        $this->container->share(RequireContributingResident::class)
            ->withArgument('JWT User');
    }
}