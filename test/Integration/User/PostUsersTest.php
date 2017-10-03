<?php
declare(strict_types=1);

namespace Test\Integration\User;

use PHPUnit\Framework\TestCase;
use Test\Integration\IntegrationTestHelpers;

class PostUsersTest extends TestCase
{
    use IntegrationTestHelpers;

    public function setUp(): void
    {
        $this->resetApplication();
    }

    public function testCanCreateInitialAdmin(): void
    {
        $response = $this->post(
            '/api/users',
            ['email' => 'abc@123.c', 'name' => 'abc', 'password' => '123', 'roles' => ['admin', 'resident']]
        );
        echo (string)$response->getBody();
        $this->assertSame(200, $response->getStatusCode());
    }

    public function testForbiddenToCreateUsers(): void
    {
        $response = $this->post(
            '/api/users',
            ['email' => 'abc@123.c', 'name' => 'abc', 'password' => '123', 'roles' => ['admin', 'resident']]
        );
        $this->assertSame(200, $response->getStatusCode());
        $this->resetApplication();

        $response = $this->post(
            '/api/users',
            ['email' => 'c@123.c', 'name' => 'abc', 'password' => '123', 'roles' => ['admin', 'resident']]
        );
        $this->assertSame(403, $response->getStatusCode());
    }
}