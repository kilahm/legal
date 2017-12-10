import {Effect} from '../../store/Effect';
import {State} from '../../reducer';
import {Client} from '../../api/Client';
import {isErrorResponse} from '../../api/responses/ErrorResponse';
import {injectable} from 'inversify';
import {Action} from '../../store/Action';
import {Dispatch} from '../../store/Dispatch';
import {ShowError} from '../../core/actions/ShowError';
import {SetRoute} from '../../router/actions/SetRoute';
import {MeetingsFetched} from '../actions/MeetingsFetched';
import {SetMeetings} from '../actions/SetMeetings';
import {FetchMeetings as FetchMeetingsAction} from '../actions/FetchMeetings';

@injectable()
export class FetchMeetings implements Effect {
  constructor(private api: Client) {
  }

  async run(next: () => Promise<State>, action: Action<any>, dispatch: Dispatch): Promise<void> {
    const state = await next();
    if (FetchMeetings.skipAction(action, state)) {
      return;
    }
    const {body} = await this.api.getMeetings();
    if (isErrorResponse(body)) {
      await dispatch(new ShowError(body));
      return;
    }
    await Promise.all([
      dispatch(new SetMeetings({meetings: body})),
      dispatch(new MeetingsFetched()),
    ]);

  }

  private static skipAction(action: Action<any>, state: State): boolean {
    if (!state.auth.jwt.isValid()) {
      return true;
    }
    if (action instanceof SetRoute) {
      return action.payload.path.match(/meetings/) === null || !state.meetings.needsData;
    }
    return !(
      action instanceof FetchMeetingsAction
    );
  }
}