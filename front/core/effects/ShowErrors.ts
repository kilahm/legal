import {Effect} from '../../store/Effect';
import {injectable} from 'inversify';
import {ShowError} from '../ShowError';
import {Action} from '../../store/Action';
import {State} from '../../reducer';

@injectable()
export class ShowErrors implements Effect {
  async run(next: () => Promise<State>, action: Action<any>): Promise<void> {
    if (!(
        action instanceof ShowError
      )) {
      await next();
    }
    console.error(JSON.stringify(action.payload));
    await next();
  }
}