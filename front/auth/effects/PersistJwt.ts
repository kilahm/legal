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

  run(action: Action): void {
    if (LoginActions.isSetUserJwt(action)) {
      this.localStorage.setItem(PersistJwt.JwtKey.toString(), action.payload.jwt.raw);
    }
    if (LoginActions.isLogout(action)) {
      this.localStorage.removeItem(PersistJwt.JwtKey.toString());
    }
  }
}