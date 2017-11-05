import {Action} from 'redux';
import {Meeting} from '../api/Meeting';

export class Actions {
  private static readonly ADD_MEETING = Symbol('add meeting');
  private static CREATE_MEETING = Symbol('create meeting');
  private static SET_NEW_MEETING_CALENDAR_OPEN = Symbol('set new meeting calendar open state');
  private static UPDATE_DATE_FOR_NEW_MEETING = Symbol('update date in new meeting form');
  private static RESET_SELECTED_DATE_FOR_NEW_MEETING = Symbol('reset date in new meeting');

  static addMeeting(meeting: Meeting): AddMeeting {
    return {
      type: Actions.ADD_MEETING,
      payload: {meeting},
    };
  }

  static isAddMeeting(action: Action): action is AddMeeting {
    return action.type === Actions.ADD_MEETING;
  }

  static createMeeting(meeting: Meeting): CreateMeeting {
    return {
      type: Actions.CREATE_MEETING,
      payload: {meeting},
    };
  }

  static isCreateMeeting(action: Action): action is CreateMeeting {
    return action.type === Actions.CREATE_MEETING;
  }

  static setNewMeetingCalendarOpenState(openState: boolean): SetNewMeetingCalendarOpenState {
    return {
      type: Actions.SET_NEW_MEETING_CALENDAR_OPEN,
      payload: {openState},
    };
  }

  static isSetNewMeetingCalendarOpenState(action: Action): action is SetNewMeetingCalendarOpenState {
    return action.type === Actions.SET_NEW_MEETING_CALENDAR_OPEN;
  }

  static updateSelectedDateForNewMeeting(date: Date): UpdateDateForNewMeeting {
    return {
      type: Actions.UPDATE_DATE_FOR_NEW_MEETING,
      payload: {date},
    };
  }

  static isUpdateDateForNewMeeting(action: Action): action is UpdateDateForNewMeeting {
    return action.type === Actions.UPDATE_DATE_FOR_NEW_MEETING;
  }

  static resetSelectedDateForNewMeeting(): ResetSelectedDateForNewMeeting {
    return {
      type: Actions.RESET_SELECTED_DATE_FOR_NEW_MEETING,
    };
  }

  static isResetSelectedDateForNewMeeting(action: Action): action is ResetSelectedDateForNewMeeting {
    return action.type === Actions.RESET_SELECTED_DATE_FOR_NEW_MEETING;
  }
}

interface ResetSelectedDateForNewMeeting extends Action {
}

interface UpdateDateForNewMeeting extends Action {
  payload: { date: Date };
}

export interface AddMeeting extends Action {
  payload: { meeting: Meeting };
}

export interface CreateMeeting extends Action {
  payload: { meeting: Meeting };
}

export interface SetNewMeetingCalendarOpenState extends Action {
  payload: { openState: boolean };
}