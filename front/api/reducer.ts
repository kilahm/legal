import {Reducer} from 'redux';
import {ServerState} from './ServerState';
import {Actions} from './Actions';

export interface State {
  state: ServerState
}

const defaultState: State = {
  state: {
    hasAdmin: true,
  },
};

export const reducer: Reducer<State> = (state = defaultState, action) => {
  if (Actions.isServerStateFetched(action)) {
    return {
      ...state,
      state: action.payload.state,
    };
  }

  if (Actions.isSetServerState(action)) {
    return {
      ...state,
      state: {
        ...state.state,
        ...action.payload.state,
      },
    };
  }
  return state;
};