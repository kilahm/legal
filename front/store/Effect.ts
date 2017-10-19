import {Action, Dispatch} from 'redux';

export interface Effect {
  run<S>(action: Action, dispatch: Dispatch<S>, getState: () => S): void | Promise<void>;
}