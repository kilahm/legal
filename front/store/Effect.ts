import {State} from '../reducer';
import {Action} from './Action';
import {Dispatch} from './Dispatch';

export interface Effect {
  run(action: Action<any>, dispatch: Dispatch, getState: () => State): Promise<void>;
}