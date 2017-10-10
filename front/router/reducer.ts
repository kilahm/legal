import {Action} from 'redux';
import {Actions} from './Actions';

export interface State {
  path: string | null;
  query: URLSearchParams | null;
}

const initialState: State = {
  path: null,
  query: null,
};

export function reducer(state: State = initialState, action: Action): State {
  if (Actions.isChangeRoute(action)) {
    return {...state, path: action.payload.path, query: action.payload.query};
  }
  return state;
}