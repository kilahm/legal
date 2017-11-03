import {Action, combineReducers, Reducer} from 'redux';
import {Meeting} from '../api/Meeting';
import {Actions} from './Actions';
import {formReducer, modelReducer} from 'react-redux-form';
import {FormState} from '../util';

export interface State {
  all: { [id: string]: Meeting };
  newMeeting: FormState<NewMeetingModel>;
}

export interface NewMeetingModel {
  date: string;
}

const newMeetingInitialState: NewMeetingModel = {
  date: '',
};

export const reducer: Reducer<State> = combineReducers<State>({
  all: updateMeetings,
  newMeeting: combineReducers({
    form: formReducer('meetings.newMeeting.model', newMeetingInitialState),
    model: modelReducer('meetings.newMeeting.model', newMeetingInitialState),
  }),
});

function updateMeetings(state: { [id: string]: Meeting } = {}, action: Action): { [id: string]: Meeting } {
  if (Actions.isAddMeeting(action)) {
    const meeting = action.payload.meeting;
    return {[meeting.id]: meeting, ...state};
  }
  return state;
}
