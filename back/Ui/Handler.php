<?php

namespace App\Ui;

use Slim\Http\Body;
use Slim\Http\Response;

class Handler
{
    public function __invoke()
    {
        return (new Response())->withBody(new Body(fopen(__DIR__ . '/index.html', 'r')));
    }
}
