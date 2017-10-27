<?php
declare(strict_types=1);

namespace App\Auth;

use App\Auth\Jwt\Manager;
use App\Output\ResponseFactory;
use App\User\User;

class GetFreshToken
{
    /** @var Manager */
    private $jwtManager;
    /** @var User */
    private $user;

    public function __construct(User $user, Manager $jwtManager)
    {
        $this->user = $user;
        $this->jwtManager = $jwtManager;
    }

    public function __invoke()
    {
        return ResponseFactory::json(['jwt' => $this->jwtManager->buildTokenFromUser($this->user)]);
    }
}