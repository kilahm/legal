import {Effect} from '../../store/Effect';
import {injectable} from 'inversify';
import {Client} from '../../api/Client';
import {isErrorResponse} from '../../api/responses/ErrorResponse';
import {isMeeting} from '../../api/Meeting';
import {Action} from '../../store/Action';
import {Dispatch} from '../../store/Dispatch';
import {ShowError} from '../../core/actions/ShowError';
import {State} from '../../reducer';
import {CreateMeeting} from '../actions/CreateMeeting';
import {AddMeeting} from '../actions/AddMeeting';

@injectable()
export class CreateNewMeeting implements Effect {

  constructor(private api: Client) {
  }

  async run(next: () => Promise<State>, action: Action<any>, dispatch: Dispatch): Promise<void> {
    await next();
    if (!(
        action instanceof CreateMeeting
      )) {
      return;
    }
    const {body} = await this.api.createMeeting(action.payload.start);
    if (isMeeting(body)) {
      await dispatch(new AddMeeting({meeting: body}));
    }
    if (isErrorResponse(body)) {
      await dispatch(new ShowError(body));
    }
  }
}