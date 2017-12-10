import {Action} from '../store/Action';
import {SetRoute} from './actions/SetRoute';

export interface State {
  path: string | null;
  query: string | null;
  title: string | null;
}

const initialState: State = {
  path: null,
  query: null,
  title: null,
};

export function reducer(action: Action<any>, state: State = initialState): State {
  if (action instanceof SetRoute) {
    const {path, query, title} = action.payload;
    return {...state, path, query: query || null, title: title || null};
  }
  return state;
}