import {ServerState} from './ServerState';
import {Reducer} from '../store/Reducer';
import {ServerStateFetched, SetServerState} from './Actions';

export interface State {
  state: ServerState
}

const defaultState: State = {
  state: {
    hasAdmin: true,
  },
};

export const reducer: Reducer<State> = (action, state = defaultState) => {
  if (action instanceof ServerStateFetched) {
    return {
      ...state,
      state: action.payload.state,
    };
  }

  if (action instanceof SetServerState) {
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