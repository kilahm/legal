import {inject, injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {Action, Dispatch} from 'redux';
import {Actions} from '../Actions';
import {State} from '../../store/reducer';

@injectable()
export class UpdateBrowser implements Effect {
  constructor(
    @inject('history') private history: History,
  ) {
  }

  run(action: Action, dispatch: Dispatch<State>): void {
    if (!Actions.isChangeRoute(action)) {
      return;
    }
    const {path, title} = action.payload;
    if (!this.pathHasChanged(path)) {
      return;
    }
    const titleToUse = title === undefined || title === null ? 'ELM Minutes' : title;
    this.history.pushState({path: path}, titleToUse, path);
    dispatch(Actions.setRoute(action.payload));
  }

  private pathHasChanged(path: string) {
    if (this.history.state && this.history.state.path) {
      return path !== this.history.state.path;
    }
    return true;
  }
}