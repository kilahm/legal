import {State} from '../reducer';
import {Action} from './Action';
import {Dispatch} from './Dispatch';

export interface Effect {
  run(
    next: () => Promise<Readonly<State>>,
    action: Action<any>,
    dispatch: Dispatch,
    getState: () => Readonly<State>,
  ): Promise<void>;
}