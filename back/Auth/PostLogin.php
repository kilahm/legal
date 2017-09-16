<?php
declare(strict_types=1);

namespace App\Auth;

use App\Input\Input;
use App\Input\Validator\Email;
use App\Input\Validator\StringValue;
use App\Output\ResponseFactory;
use App\User\Repository;
use App\User\User;
use App\Util\ControllerUtils;
use Psr\Http\Message\ResponseInterface;
use Slim\Http\Request;

class PostLogin
{
    use ControllerUtils;

    const BAD_PASSWORD_MESSAGE = 'Incorrect email or password';

    /** @var Repository */
    private $repository;

    public function __construct(Repository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(Request $request): ResponseInterface
    {
        return Input::validate(
            $this->extractFromRequest(['email', 'password'], $request),
            [
                'email' => new Email(),
                'password' => new StringValue(),
            ],
            function (array $data) {
                $user = $this->repository->fetchUserByEmail($data['email']);
                if ($user === null) {
                    return $this->preventTimingAttack();
                }

                $result = $user->checkPassword($data['password']);
                if (!$result->isMatch()) {
                    return ResponseFactory::apiError(403, self::BAD_PASSWORD_MESSAGE);
                }
                if ($result->needsRehash()) {
                    $this->repository->updateUser($user->withPassword($data['password']));
                }
                return ResponseFactory::json(['jwt' => 'somejwt']);
            }
        );
    }

    private function preventTimingAttack()
    {
        (new User('', '', '', []))->checkPassword('');
        return ResponseFactory::apiError(403, self::BAD_PASSWORD_MESSAGE);
    }
}