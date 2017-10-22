import {Reducer} from 'redux';
import {Actions} from './Actions';

export interface State {
  error: {
    message: string,
    context: string,
  };
}
export const reducer: Reducer<State> = (state, action) => {
  if(Actions.isShowError(action)) {
    return {
      ...state,
      error: {
        message: action.payload.error,
        context: action.payload.context,
      }
    }
  }
 return state;
};