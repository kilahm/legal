import {Reducer} from './Reducer';
import {Action} from './Action';

export function combineReducers<State extends object>(reducers: {[K in keyof State]: Reducer<State[K]>}): Reducer<State> {

  return (action: Action<any>, state?: State): State => {
    const newState = {} as State;
    let changed = false;
    if(state === undefined) {
      state = {} as State;
    }
    for (let r in reducers) {
      newState[r] = reducers[r](action, state[r]);
      if (newState[r] !== state[r]) {
        changed = true;
      }
    }
    return changed ? newState : state;
  };
}