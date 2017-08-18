<?php
declare(strict=1);

namespace App\Auth;

use App\Config\Env;
use Lcobucci\JWT\Signer;
use League\Container\Argument\RawArgument;
use League\Container\ServiceProvider\AbstractServiceProvider;

class Provider extends AbstractServiceProvider
{

    protected $provides = [
        PostLogin::class,
        LoginRepository::class,
    ];

    public function register()
    {
        $this->container->share(LoginRepository::class)->withArgument(\PDO::class);
        $this->container->share(PostLogin::class)->withArgument(LoginRepository::class);
        $this->container->share(Signer::class, function () {
            return new Signer\Hmac\Sha256();
        });
        $this->container->share(Middleware::class)->withArguments([
            Signer::class,
            new RawArgument(Env::getJwtSigningKey()),
        ]);
    }
}