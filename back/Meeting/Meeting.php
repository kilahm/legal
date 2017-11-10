<?php
declare(strict_types=1);

namespace App\Meeting;

use Ramsey\Uuid\UuidInterface;

final class Meeting
{
    /** @var \DateTimeImmutable */
    private $start;
    /** @var UuidInterface */
    private $id;

    public function __construct(UuidInterface $id, \DateTimeImmutable $start)
    {
        $this->start = $start;
        $this->id = $id;
    }

    public function getStart(): \DateTimeImmutable
    {
        return $this->start;
    }

    public function getId(): UuidInterface
    {
        return $this->id;
    }
}