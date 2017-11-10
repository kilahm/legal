<?php
declare(strict_types=1);

namespace App\Meeting;

use App\Persistence\Db;
use Ramsey\Uuid\Uuid;

class Repository
{
    const MEETING_TABLE = 'meeting';

    /** @var Db */
    private $db;

    public function __construct(Db $db)
    {
        $this->db = $db;
    }

    public function createMeeting(\DateTimeImmutable $start): Meeting
    {
        $id = Uuid::uuid4();
        $this->db->insertInto(self::MEETING_TABLE)
            ->record(
                [
                    'id' => $id->toString(),
                    'start' => $start->getTimestamp(),
                ]
            )->execute();

        return new Meeting($id, $start);
    }

    public function fetchAllMeetings(): \Generator
    {
        $data = $this->db
            ->fetch(self::MEETING_TABLE)
            ->fields('id', 'start')
            ->all();
        foreach ($data as $row) {
            $start = new \DateTimeImmutable("@{$row['start']}", new \DateTimeZone('UTC'));
            yield new Meeting(Uuid::fromString($row['id']), $start);
        }
    }
}