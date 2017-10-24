import {Reducer} from 'redux';
import {Actions} from './Actions';

export interface State {
  error: null | {
    message: string,
    context: string,
  };
}

const defaultState = {error: null};

export const reducer: Reducer<State> = (state = defaultState, action) => {
  if (Actions.isShowError(action)) {
    return {
      ...state,
      error: {
        message: action.payload.error,
        context: action.payload.context,
      },
    };
  }
  return state;
};