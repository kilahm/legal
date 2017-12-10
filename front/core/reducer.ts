import {ShowError} from './actions/ShowError';
import {Action} from '../store/Action';
import {InitializeApp} from './actions/InitializeApp';

export interface State {
  error: null | {
    message: string,
    context: string,
  };
  contentRoot: null|Element;
}

const defaultState = {
  error: null,
  contentRoot: null,
};

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
  if(action instanceof InitializeApp) {
    return {
      ...state,
      contentRoot: action.payload.contentRoot
    }
  }
  return state;
}