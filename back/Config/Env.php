<?php

namespace App\Config;

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

    public static function getDbDriver()
    {
        return self::get('DB.DRIVER');
    }

    public static function getDbHost()
    {
        return self::get('DB.HOST');
    }

    public static function getDbPort()
    {
        return self::get('DB.PORT');
    }

    public static function getDbSchema()
    {
        return self::get('DB.SCHEMA');
    }

    public static function getDbUser()
    {
        return self::get('DB.USER');
    }

    public static function getDbPassword()
    {
        return self::get('DB.PASSWORD');
    }
}