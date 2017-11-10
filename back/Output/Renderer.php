<?php
declare(strict_types=1);

namespace App\Output;

use App\Meeting\Meeting;
use App\User\Role;
use App\User\User;

class Renderer
{
    public static function renderUser(User $user): array
    {
        return [
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'roles' => array_map(
                function (Role $role) {
                    return $role->getValue();
                },
                $user->getRoles()
            ),
        ];
    }

    public static function renderMeeting(Meeting $meeting): array
    {
        return [
            'id' => $meeting->getId()->toString(),
            'start' => $meeting->getStart()->getTimestamp(),
        ];
    }

    public static function renderMeetingList(Meeting ...$meetings)
    {
        return array_reduce(
            $meetings,
            function (array $json, Meeting $meeting): array {
                $id = $meeting->getId()->toString();
                $json[$id] = self::renderMeeting($meeting);
                return $json;
            },
            []
        );
    }
}