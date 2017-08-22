<?php
declare(strict_types=1);

namespace App\Util;

/**
 * Type safe enums
 *
 * To use this trait, "use" it and define class constants.
 * Each constant name will be a valid static magic method that returns a singleton of the implementing class.
 */
trait Enum
{
    /**
     * The opaque value this instance represents
     *
     * @var mixed
     */
    protected $value;

    /**
     * List of singletons indexed by enum names
     *
     * @var static[]
     */
    private static $instancesByName = [];

    /**
     * List of singletons indexed by opaque values
     *
     * @var static[]
     */
    private static $instancesByValue = [];

    /**
     * @param string $value
     */
    private final function __construct(string $value)
    {
        $this->value = $value;
    }

    /**
     * Get the name.
     *
     * @return string
     */
    public function getName()
    {
        foreach (self::$instancesByName as $name => $instance) {
            if ($instance === $this) {
                return $name;
            }
        }
        throw new \RuntimeException('Cannot determine name of an enum instance.');
    }

    /**
     * Get the opaque value.  This should be used sparingly.
     *
     * @return string
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Prevent cloning of singleton instances
     */
    final public function __clone()
    {
        throw new \RuntimeException('Cannot clone enum instances. All instances are singletons.');
    }

    /**
     * Return a list of all singletons indexed by the enum names.
     *
     * @return static[]
     */
    public static function getValues()
    {
        static::initialize();
        return static::$instancesByName;
    }

    /**
     * @param $value
     *
     * @return static
     */
    public static function assert(string $value)
    {
        $instance = static::coerce($value);
        if ($instance === null) {
            throw new \InvalidArgumentException('Invalid enum value: ' . $value);
        }
        return $instance;
    }

    /**
     * @param $value
     *
     * @return static|null
     */
    public static function coerce(string $value)
    {
        if ($value instanceof static) {
            return $value;
        }

        static::initialize();
        if (isset(static::$instancesByValue[$value])) {
            return static::$instancesByValue[$value];
        }
        return null;
    }

    /**
     * @param $name
     * @param $arguments
     *
     * @return static
     */
    final static public function __callStatic($name, $arguments)
    {
        static::initialize();
        if (isset(static::$instancesByName[$name])) {
            return static::$instancesByName[$name];
        }
        throw new \InvalidArgumentException('Invalid enum name: ' . $name);
    }

    /**
     * Use reflection to build list of all enum values
     */
    private static function initialize()
    {
        if (!empty(static::$instancesByValue)) {
            return;
        }

        $mirror = new \ReflectionClass(static::class);
        if (!$mirror->isFinal()) {
            throw new \RuntimeException('All enum classes must be final');
        }
        foreach ($mirror->getConstants() as $name => $value) {
            if(!is_string($value)) {
                throw new \RuntimeException('All enum values must be strings');
            }
            $instance = new static($value);
            static::$instancesByName[$name] = $instance;
            static::$instancesByValue[$value] = $instance;
        }
    }
}
