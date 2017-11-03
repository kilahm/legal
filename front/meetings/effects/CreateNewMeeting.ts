import {Effect} from '../../store/Effect';
import {State} from '../../store/reducer';
import {Action, Dispatch} from 'redux';
import {injectable} from 'inversify';
import {Actions as MeetingsActions} from '../Actions';

@injectable()
export class CreateNewMeeting implements Effect<State> {

  async run(action: Action, dispatch: Dispatch<State>): Promise<void> {
    if (!MeetingsActions.isCreateMeeting(action)) {
      return;
    }
    dispatch(MeetingsActions.addMeeting(action.payload.meeting));
  }
}