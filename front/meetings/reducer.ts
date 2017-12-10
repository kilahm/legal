import {Meeting} from '../api/Meeting';
import {Reducer} from '../store/Reducer';
import {Action} from '../store/Action';
import {AddMeeting} from './actions/AddMeeting';
import {SetNewMeetingCalendarOpenState} from './actions/SetNewMeetingCalendarOpenState';
import {UpdateDateForNewMeeting} from './actions/UpdateDateForNewMeeting';
import {SetMeetings} from './actions/SetMeetings';
import {MeetingsFetched} from './actions/MeetingsFetched';
import {ResetSelectedDateForNewMeeting} from './actions/ResetSelectedDateForNewMeeting';

export interface State {
  all: { [id: string]: Meeting };
  newMeeting: {
    isOpen: boolean,
    selectedDate?: Date,
  };
  needsData: boolean;
}

const DefaultState: State = {
  all: {},
  newMeeting: {
    isOpen: false,
  },
  needsData: true,
};

export const reducer: Reducer<State> = (action: Action<any>, state: State = DefaultState): State => {
  if (action instanceof AddMeeting) {
    const meeting = action.payload.meeting;
    return {
      ...state,
      all: {
        ...state.all,
        [meeting.id]: meeting,
      },
    };
  }
  if (action instanceof SetNewMeetingCalendarOpenState) {
    return {
      ...state,
      newMeeting: {
        ...state.newMeeting,
        isOpen: action.payload.openState,
      },
    };
  }
  if (action instanceof UpdateDateForNewMeeting) {
    return {
      ...state,
      newMeeting: {
        ...state.newMeeting,
        selectedDate: action.payload.date,
      },
    };
  }
  if (action instanceof SetMeetings) {
    return {
      ...state,
      all: action.payload.meetings,
    };
  }
  if (action instanceof MeetingsFetched) {
    return {
      ...state,
      needsData: false,
    };
  }
  if (action instanceof ResetSelectedDateForNewMeeting) {
    const newMeetingState = {...state.newMeeting};
    delete newMeetingState.selectedDate;
    return {
      ...state,
      newMeeting: newMeetingState,
    };
  }
  return state;
};
