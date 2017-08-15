<?php

namespace App\Core;

use Psr\Http\Message\ResponseInterface;
use Slim\Http\Body;
use Slim\Http\Headers;
use Slim\Http\Response;

class ResponseFactory
{
    /**
     * @param array|\JsonSerializable $data
     * @return ResponseInterface
     */
    public static function json($data): ResponseInterface
    {
        return (new Response())->withJson($data);
    }

    public static function apiError(int $status, string $message, array $context = []): ResponseInterface
    {
        if ($status < 400 || 600 <= $status) {
            throw new \Exception('Invalid HTTP status when generating an error: ' . $status);
        }
        $body = ['error' => $message];
        if (!empty($context)) {
            $body['context'] = $context;
        }
        return (new Response($status))->withJson($body);
    }

    public static function file(string $path, string $contentType): ResponseInterface
    {
        $finfo = new \SplFileInfo($path);
        if (!$finfo->isReadable()) {
            throw new \Exception('Unable to open file to stream');
        }
        if (!$finfo->isFile()) {
            throw new \Exception('Attempting to stream a non-file');
        }

        return new Response(
            200,
            new Headers(['content-type' => $contentType]),
            new Body(fopen($finfo->getRealPath(), 'r'))
        );
    }
}