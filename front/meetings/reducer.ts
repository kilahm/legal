import {Reducer} from 'redux';
import {Meeting} from '../api/Meeting';

export interface State {
  all: { [id: string]: Meeting } ;
}

const defaultState: State = {
  all: {},
};

export const reducer: Reducer<State> = (state = defaultState) => {
  return state;
};