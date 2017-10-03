<?php
declare(strict_types=1);

namespace Test\Integration;

use Slim\Http\Body;

class JsonBody extends Body
{
    public function __construct(array $json)
    {
        $stream = fopen('php://temp', 'w+');
        fputs($stream, json_encode($json));
        parent::__construct($stream);
    }
}