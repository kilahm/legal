import {Reducer} from 'redux';
import {Actions} from './Actions';

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

export const reducer: Reducer<State> = (state = initialState, action) => {
  if (Actions.isSetRoute(action)) {
    const {path, query, title} = action.payload;
    return {...state, path, query: query || null, title: title || null};
  }
  return state;
};