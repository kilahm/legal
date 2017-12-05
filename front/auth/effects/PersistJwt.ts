import {inject, injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {Action} from '../../store/Action';
import {Logout, SetUserJwt} from '../Actions';
import {State} from '../../reducer';

@injectable()
export class PersistJwt implements Effect {

  static readonly JwtKey = Symbol('user.jwt');

  constructor(
    @inject('localStorage') private localStorage: Storage,
  ) {
  }

  async run(next: () => Promise<State>, action: Action<any>): Promise<void> {
    await next();
    if (action instanceof SetUserJwt) {
      this.localStorage.setItem(PersistJwt.JwtKey.toString(), action.payload.jwt.raw);
    }
    if (action instanceof Logout) {
      this.localStorage.removeItem(PersistJwt.JwtKey.toString());
    }
  }
}