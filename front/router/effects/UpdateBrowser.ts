import {inject, injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {Dispatch} from '../../store/Dispatch';
import {Action} from '../../store/Action';
import {ChangeRoute} from '../ChangeRoute';
import {SetRoute} from '../SetRoute';
import {State} from '../../reducer';

@injectable()
export class UpdateBrowser implements Effect {
  constructor(
    @inject('history') private history: History,
  ) {
  }

  async run(next: () => Promise<State>, action: Action<any>, dispatch: Dispatch): Promise<void> {
    await next();
    if (!(
        action instanceof ChangeRoute
      )) {
      return;
    }
    const {path, title} = action.payload;
    if (!this.pathHasChanged(path)) {
      return;
    }
    const titleToUse = title === undefined || title === null ? 'ELM Minutes' : title;
    this.history.pushState({path: path}, titleToUse, path);
    await dispatch(new SetRoute(action.payload));
  }

  private pathHasChanged(path: string) {
    if (this.history.state && this.history.state.path) {
      return path !== this.history.state.path;
    }
    return true;
  }
}