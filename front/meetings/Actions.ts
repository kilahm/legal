import {Action} from 'redux';
import {Meeting} from '../api/Meeting';

export class Actions {
  private static readonly ADD_MEETING = Symbol('add meeting');
  private static CREATE_MEETING = Symbol('create meeting');

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
}

export interface AddMeeting extends Action {
  payload: { meeting: Meeting };
}

export interface CreateMeeting extends Action {
  payload: { meeting: Meeting };
}