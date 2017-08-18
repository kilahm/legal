<?php
declare(strict=1);

namespace App\Util;

class Arr
{
    /**
     * @param array $array
     * @param string|int $key
     * @param $default
     * @return mixed
     */
    public static function get(array $array, $key, $default = null): mixed
    {
        if (array_key_exists($key, $array)) {
            return $array[$key];
        }
        return $default;
    }
}