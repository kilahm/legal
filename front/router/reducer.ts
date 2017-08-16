import {Action} from 'redux';
import {Actions} from './Actions';

export interface State {
  route: string|null;
}

const initialState: State = {
  route: null,
};

export function reducer(state: State = initialState, action: Action): State {
  if (Actions.isChangeRoute(action)) {
    return {...state, route: action.payload.route};
  }
  return state;
}