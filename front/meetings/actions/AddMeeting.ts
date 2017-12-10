import {Meeting} from '../../api/Meeting';
import {Action} from '../../store/Action';

type AddMeetingPayload = { meeting: Meeting };

export class AddMeeting extends Action<AddMeetingPayload> {
}
