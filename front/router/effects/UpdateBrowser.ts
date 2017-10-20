import {inject, injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {Action} from 'redux';
import {Actions} from '../Actions';

@injectable()
export class UpdateBrowser implements Effect {
  constructor(
    @inject('history') private history: History,
  ) {
  }

  run(action: Action): void {
    if (!Actions.isChangeRoute(action)) {
      return;
    }
    const {path, title} = action.payload;
    if (!this.pathHasChanged(path)) {
      return;
    }
    const titleToUse = title === undefined || title === null ? 'ELM Minutes' : title;
    this.history.pushState({path: path}, titleToUse, path);
  }

  private pathHasChanged(path: string) {
    console.log(this.history.state);
    if (this.history.state && this.history.state.path) {
      return path !== this.history.state.path;
    }
    return true;
  }
}