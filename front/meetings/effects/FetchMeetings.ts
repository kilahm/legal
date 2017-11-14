import {Effect} from '../../store/Effect';
import {Dispatch} from 'react-redux';
import {State} from '../../store/reducer';
import {Action} from 'redux';
import {Actions as RouterActions} from '../../router/Actions';
import {Actions as CoreActions} from '../../core/Actions';
import {Actions as MeetingsActions} from '../Actions';
import {Client} from '../../api/Client';
import {isErrorResponse} from '../../api/responses/ErrorResponse';
import {injectable} from 'inversify';

@injectable()
export class FetchMeetings implements Effect {
  constructor(private api: Client) {
  }

  async run(action: Action, dispatch: Dispatch<State>, getState: () => State): Promise<void> {
    if (!RouterActions.isSetRoute(action)) {
      return;
    }
    const state = getState();
    if (action.payload.path.match(/meetings/) && state.meetings.needsData) {
      const {body} = await this.api.getMeetings();
      if (isErrorResponse(body)) {
        dispatch(CoreActions.showError(body.error, body.context));
        return;
      }
      dispatch(MeetingsActions.setMeetings(body));
      dispatch(MeetingsActions.meetingsFetched());
    }
  }
}