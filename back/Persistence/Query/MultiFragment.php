<?php
declare(strict_types=1);

namespace App\Persistence\Query;

class MultiFragment implements SqlFragment
{
    /** @var SqlFragment[] */
    private $fragments;
    /** @var string */
    private $glue;

    public function __construct(string $glue, SqlFragment ...$fragments)
    {
        $this->fragments = $fragments;
        $this->glue = $glue;
    }

    /**
     * Valid SQL statement with PDO compatible replacement tokens
     *
     * @return string
     */
    public function toSql(): string
    {
        return implode(
            $this->glue,
            array_reduce(
                $this->fragments,
                function (array $parts, SqlFragment $fragment) {
                    $sql = $fragment->toSql();
                    if ($sql !== '') {
                        $parts[] = $sql;
                    }
                    return $parts;
                },
                []
            )
        );
    }

    /**
     * Array of values to use for the tokens
     *
     * @return string[]
     */
    public function getParameters(): array
    {
        return array_reduce(
            $this->fragments,
            function (array $params, SqlFragment $fragment): array {
                return array_merge($params, $fragment->getParameters());
            },
            []
        );
    }
}