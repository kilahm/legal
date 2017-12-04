import {Action} from './Action';
import {State} from '../reducer';

export interface Dispatch {
  (action: Action<any>): Promise<State>;
}