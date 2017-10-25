import {inject, injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {Action, Dispatch} from 'redux';
import {Actions as LoginActions} from '../Actions';
import {State} from '../../store/reducer';
import {PersistJwt} from './PersistJwt';

@injectable()
export class LoadJwt implements Effect {

  constructor(
    @inject('localStorage') private localStorage: Storage,
  ) {
  }

  async run(action: Action, dispatch: Dispatch<State>): Promise<void> {
    if (!LoginActions.isLoadUserJwt(action)) {
      return;
    }
    const localJwt = this.localStorage.getItem(PersistJwt.JwtKey.toString());
    if (typeof localJwt === 'string') {
      dispatch(LoginActions.setUserJwt(localJwt));
    }
  }
}
