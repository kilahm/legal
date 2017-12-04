import {Effect} from '../../store/Effect';
import {State} from '../../reducer';
import {Client} from '../../api/Client';
import {isErrorResponse} from '../../api/responses/ErrorResponse';
import {injectable} from 'inversify';
import {Action} from '../../store/Action';
import {Dispatch} from '../../store/Dispatch';
import {MeetingsFetched, SetMeetings} from '../Actions';
import {ShowError} from '../../core/ShowError';
import {SetRoute} from '../../router/SetRoute';

@injectable()
export class FetchMeetings implements Effect {
  constructor(private api: Client) {
  }

  async run(action: Action<any>, dispatch: Dispatch, getState: () => State): Promise<void> {
    if (!FetchMeetings.handleAction(action, getState())) {
      return;
    }
    const {body} = await this.api.getMeetings();
    if (isErrorResponse(body)) {
      await dispatch(new ShowError(body));
      return;
    }
    await dispatch(new SetMeetings({meetings: body}));
    await dispatch(new MeetingsFetched());
  }

  private static handleAction(action: Action<any>, state: State): boolean {
    if (action instanceof SetRoute) {
      return action.payload.path.match(/meetings/) !== null && state.meetings.needsData;
    }
    if (action instanceof FetchMeetings) {
      return true;
    }
    return false;
  }
}