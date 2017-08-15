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
    public static function get(string $key)
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
}