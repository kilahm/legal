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

    public static function isVector(array $data, bool $emptyIsVector = false): bool
    {
        if (empty($data)) {
            return $emptyIsVector;
        }

        foreach (array_keys($data) as $i => $key) {
            if ($i !== $key) {
                return false;
            }
        }
        return true;
    }

    public static function isAssoc($data, bool $emptyIsAssoc = true): bool
    {
        return !self::isVector($data, !$emptyIsAssoc);
    }
}