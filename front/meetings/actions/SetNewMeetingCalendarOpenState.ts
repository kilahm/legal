import {Action} from '../../store/Action';

type Payload = { openState: boolean };

export class SetNewMeetingCalendarOpenState extends Action<Payload> {
}
