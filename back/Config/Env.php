<?php
declare(strict_types=1);

namespace App\Config;

use App\Error\ConfigurationError;

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
    private static function get(string $key)
    {
        $value = getenv($key);
        if ($value === false) {
            return null;
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

    public static function getDbDriver()
    {
        return self::requireString('DB.DRIVER');
    }

    public static function getDbHost()
    {
        return self::requireString('DB.HOST');
    }

    public static function getDbPort()
    {
        return self::requireString('DB.PORT');
    }

    public static function getDbSchema()
    {
        return self::requireString('DB.SCHEMA');
    }

    public static function getDbUser()
    {
        return self::requireString('DB.USER');
    }

    public static function getDbPassword()
    {
        return self::requireString('DB.PASSWORD');
    }

    public static function getJwtSigningKey()
    {
        return self::requireString('JWT.SIGNING_KEY');
    }
}