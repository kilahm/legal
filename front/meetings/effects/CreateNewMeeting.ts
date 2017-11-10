import {Effect} from '../../store/Effect';
import {State} from '../../store/reducer';
import {Action, Dispatch} from 'redux';
import {injectable} from 'inversify';
import {Actions as MeetingsActions} from '../Actions';
import {Actions as CoreActions} from '../../core/Actions';
import {Client} from '../../api/Client';
import {isErrorResponse} from '../../api/responses/ErrorResponse';
import {isMeeting} from '../../api/Meeting';

@injectable()
export class CreateNewMeeting implements Effect<State> {

  constructor(private api: Client) {
  }

  async run(action: Action, dispatch: Dispatch<State>): Promise<void> {
    if (!MeetingsActions.isCreateMeeting(action)) {
      return;
    }
    const {body} = await this.api.createMeeting(action.payload.start);
    if (isMeeting(body)) {
      dispatch(MeetingsActions.addMeeting(body));
    }
    if (isErrorResponse(body)) {
      dispatch(CoreActions.showError(body.error, body.context));
    }
  }
}