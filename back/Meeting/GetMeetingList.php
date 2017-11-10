<?php
declare(strict_types=1);

namespace App\Meeting;

use App\Output\Renderer;
use App\Output\ResponseFactory;
use Psr\Http\Message\ResponseInterface;
use Slim\Http\Request;

class GetMeetingList
{
    /** @var Repository */
    private $repo;

    public function __construct(Repository $repo)
    {
        $this->repo = $repo;
    }

    public function __invoke(Request $request): ResponseInterface
    {
        $meetings = $this->repo->fetchAllMeetings();
        return ResponseFactory::json(['meetings' => Renderer::renderMeetingList(...$meetings)]);
    }
}