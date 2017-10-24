import {Action, Dispatch} from 'redux';
import {State} from './reducer';

export interface Effect<S = State> {
  run(action: Action, dispatch: Dispatch<S>, getState: () => S): void | Promise<void>;
}