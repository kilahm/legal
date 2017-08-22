<?php
declare(strict_types=1);

namespace App\User;

use App\Input\Input;
use App\Output\Renderer;
use App\Output\ResponseFactory;
use Slim\Http\Request;
use App\Util\ControllerUtils;

class PostUsers
{
    use ControllerUtils;

    /** @var Repository */
    private $repository;

    public function __construct(Repository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(Request $request)
    {
        return Input::validate(
            $this->extractFromRequest(['email', 'name', 'password', 'roles'], $request),
            $this->buildInputValidators(),
            function(array $input) {
                $user = new User($input['email'], $input['name'], $input['password'], $input['roles']);
                $this->repository->createUser($user);
                return ResponseFactory::json(['user' => Renderer::renderUser($user)]);
            }
        );

    }

    private function buildInputValidators()
    {
        return [
            'email' => new Email(),
            'name' => new SafeString(),
            'password' => new UnsafeString(),
            'roles' => new Vector(new Enum(Role::class)),
        ];
    }
}