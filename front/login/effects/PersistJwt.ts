import {inject, injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {Action} from 'redux';
import {Actions as LoginActions} from '../Actions';

@injectable()
export class PersistJwt implements Effect {

  static readonly JwtKey = Symbol('user.jwt');

  constructor(
    @inject('localStorage') private localStorage: Storage,
  ) {
  }

  async run(action: Action): Promise<void> {
    if (!LoginActions.isSetUserJwt(action)) {
      return;
    }
    this.localStorage.setItem(PersistJwt.JwtKey.toString(), action.payload.jwt);
  }
}