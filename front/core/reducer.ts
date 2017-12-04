import {ShowError} from './ShowError';
import {Action} from '../store/Action';

export interface State {
  error: null | {
    message: string,
    context: string,
  };
}

const defaultState = {error: null};

export function reducer(action: Action<any>, state: State = defaultState): State {
  if (action instanceof ShowError) {
    return {
      ...state,
      error: {
        message: action.payload.error,
        context: action.payload.context,
      },
    };
  }
  return state;
}