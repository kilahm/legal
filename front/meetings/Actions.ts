import {Meeting} from '../api/Meeting';
import {Action, NullAction} from '../store/Action';

export class ResetSelectedDateForNewMeeting extends NullAction {
}

type UpdateDateForNewMeetingPayload = { date: Date };

export class UpdateDateForNewMeeting extends Action<UpdateDateForNewMeetingPayload> {
}

type AddMeetingPayload = { meeting: Meeting };

export class AddMeeting extends Action<AddMeetingPayload> {
}

type CreateMeetingPayload = { start: Date };

export class CreateMeeting extends Action<CreateMeetingPayload> {
}

type SetNewMeetingCalendarOpenStatePayload = { openState: boolean };

export class SetNewMeetingCalendarOpenState extends Action<SetNewMeetingCalendarOpenStatePayload> {
}

type SetMeetingsPayload = { meetings: { [key: string]: Meeting } };

export class SetMeetings extends Action<SetMeetingsPayload> {
}

export class MeetingsFetched extends NullAction {
}

export class FetchMeetings extends NullAction {
}
