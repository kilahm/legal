import {inject, injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {Action} from 'redux';
import {Actions} from '../Actions';

@injectable()
export class UpdateBrowserHistory implements Effect {
  constructor(
    @inject('history') private history: History,
  ) {
  }

  run(action: Action): void {
    if (!Actions.isChangeRoute(action)) {
      return;
    }

    const {path} = action.payload;
    this.history.pushState({path: path}, path);
  }
}