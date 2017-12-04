import {Effect} from '../../store/Effect';
import {injectable} from 'inversify';
import {ShowError} from '../ShowError';
import {Action} from '../../store/Action';

@injectable()
export class ShowErrors implements Effect {
  async run(action: Action<any>): Promise<void> {
    if (!(
        action instanceof ShowError
      )) {
      return;
    }
    console.error(JSON.stringify(action.payload));
  }
}