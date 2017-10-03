<?php
declare(strict_types=1);

namespace App\Config;

use App\Error\ConfigurationError;
use Psr\Log\LogLevel;

class Env
{
    const TRUE_VALUES = [
        'true',
        'yes',
        'on',
    ];

    const FALSE_VALUES = [
        'false',
        'no',
        'off',
    ];

    /**
     * @param string $key
     * @return null|string|bool
     */
    private static function get(string $key, $default = null)
    {
        $value = getenv($key);
        if ($value === false) {
            return $default;
        }

        if (in_array($value, self::TRUE_VALUES)) {
            return true;
        }

        if (in_array($value, self::FALSE_VALUES)) {
            return false;
        }

        return $value;
    }

    private static function requireString(string $key): string
    {
        $value = self::get($key);
        if (empty($value) || !is_string($value)) {
            throw new ConfigurationError('Unable to determine JWT signing key');
        }
        return $value;
    }

    public static function getDbDriver(): string
    {
        return self::requireString('DB.DRIVER');
    }

    public static function getDbHost(): string
    {
        return self::requireString('DB.HOST');
    }

    public static function getDbPort(): string
    {
        return self::requireString('DB.PORT');
    }

    public static function getDbSchema(): string
    {
        return self::requireString('DB.SCHEMA');
    }

    public static function getDbUser(): string
    {
        return self::requireString('DB.USER');
    }

    public static function getDbPassword(): string
    {
        return self::requireString('DB.PASSWORD');
    }

    public static function getJwtSigningKey(): string
    {
        return self::requireString('JWT.SIGNING_KEY');
    }

    public static function getLogLevel(): string
    {
        return self::get('LOG.LEVEL', LogLevel::DEBUG);
    }

    public static function set(string $key, string $value)
    {
        putenv("$key=$value");
    }
}