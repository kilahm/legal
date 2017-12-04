import {Action} from './Action';

export interface Reducer<State> {
  (action: Action<any>, state?: State): State;
}