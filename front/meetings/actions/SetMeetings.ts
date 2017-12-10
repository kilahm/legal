import {Meeting} from '../../api/Meeting';
import {Action} from '../../store/Action';

type Payload = { meetings: { [key: string]: Meeting } };

export class SetMeetings extends Action<Payload> {
}
