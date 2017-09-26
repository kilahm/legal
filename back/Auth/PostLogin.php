<?php
declare(strict_types=1);

namespace App\Auth;

use App\Input\Input;
use App\Input\Validator\Email;
use App\Input\Validator\StringValue;
use App\Output\ResponseFactory;
use App\User\Repository as UserRepository;
use App\User\ValidPassword;
use App\Util\ControllerUtils;
use Psr\Http\Message\ResponseInterface;
use Slim\Http\Request;

class PostLogin
{
    use ControllerUtils;

    const BAD_PASSWORD_MESSAGE = 'Incorrect email or password';

    /** @var UserRepository */
    private $repository;
    /**
     * @var Jwt\Manager
     */
    private $jwtManager;

    public function __construct(UserRepository $repository, Jwt\Manager $jwtManager)
    {
        $this->repository = $repository;
        $this->jwtManager = $jwtManager;
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

                $result = $user->getPassword()->check($data['password']);
                if (!$result->isMatch()) {
                    return ResponseFactory::apiError(403, self::BAD_PASSWORD_MESSAGE);
                }
                if ($result->needsRehash()) {
                    $this->repository->updateUser($user->withPassword(ValidPassword::fromRaw($data['password'])));
                }
                return ResponseFactory::json(['jwt' => $this->jwtManager->buildTokenFromUser($user)]);
            }
        );
    }

    private function preventTimingAttack()
    {
        ValidPassword::fromRaw('')->check('');
        return ResponseFactory::apiError(403, self::BAD_PASSWORD_MESSAGE);
    }
}