import {inject, injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {Action} from '../../store/Action';
import {Logout, SetUserJwt} from '../Actions';

@injectable()
export class PersistJwt implements Effect {

  static readonly JwtKey = Symbol('user.jwt');

  constructor(
    @inject('localStorage') private localStorage: Storage,
  ) {
  }

  async run(action: Action<any>): Promise<void> {
    if (action instanceof SetUserJwt) {
      this.localStorage.setItem(PersistJwt.JwtKey.toString(), action.payload.jwt.raw);
    }
    if (action instanceof Logout) {
      this.localStorage.removeItem(PersistJwt.JwtKey.toString());
    }
  }
}