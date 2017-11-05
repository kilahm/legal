import {Action, Reducer} from 'redux';
import {Meeting} from '../api/Meeting';
import {Actions} from './Actions';

export interface State {
  all: { [id: string]: Meeting };
  newMeeting: {
    isOpen: boolean,
    selectedDate?: Date,
  };
}

const DefaultState: State = {
  all: {},
  newMeeting: {
    isOpen: false,
  },
};

export const reducer: Reducer<State> = (state: State = DefaultState, action: Action): State => {
  if (Actions.isAddMeeting(action)) {
    const meeting = action.payload.meeting;
    return {
      ...state,
      all: {
        ...state.all,
        [meeting.id]: meeting,
      },
    };
  }
  if (Actions.isSetNewMeetingCalendarOpenState(action)) {
    return {
      ...state,
      newMeeting: {
        ...state.newMeeting,
        isOpen: action.payload.openState,
      },
    };
  }
  if (Actions.isUpdateDateForNewMeeting(action)) {
    return {
      ...state,
      newMeeting: {
        ...state.newMeeting,
        selectedDate: action.payload.date,
      },
    };
  }
  if (Actions.isResetSelectedDateForNewMeeting(action)) {
    const newMeetingState = {...state.newMeeting};
    delete newMeetingState.selectedDate;
    return {
      ...state,
      newMeeting: newMeetingState,
    };
  }
  return state;
};
