import {Effect} from '../../store/Effect';
import {Action} from 'react-redux-form';
import {Actions} from '../Actions';
import {injectable} from 'inversify';

@injectable()
export class ShowErrors implements Effect {
  run(action: Action): void {
    if(!Actions.isShowError(action)) {
      return;
    }
    console.error(JSON.stringify(action.payload));
  }
}