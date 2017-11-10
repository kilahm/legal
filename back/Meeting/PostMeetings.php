<?php
declare(strict_types=1);

namespace App\Meeting;

use App\Input\Input;
use App\Input\Validator\Timestamp;
use App\Output\Renderer;
use App\Output\ResponseFactory;
use App\Util\ControllerUtils;
use Slim\Http\Request;

class PostMeetings
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
            $this->extractFromRequest(['start'], $request),
            $this->buildInputValidators(),
            function (array $input) {
                $meeting = $this->repository->createMeeting($input['start']);
                return ResponseFactory::json(['meeting' => Renderer::renderMeeting($meeting)]);
            }
        );

    }

    private function buildInputValidators()
    {
        return [
            'start' => new Timestamp(),
        ];
    }
}
