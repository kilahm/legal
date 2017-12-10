import {inject, injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {Action} from '../../store/Action';
import {State} from '../../reducer';
import {Dispatch} from '../../store/Dispatch';
import {SetUserJwt} from '../actions/SetUserJwt';
import {Logout} from '../actions/Logout';

@injectable()
export class PersistJwt implements Effect {

  static readonly JwtKey = Symbol('user.jwt');

  constructor(
    @inject('localStorage') private localStorage: Storage,
  ) {
  }

  async run(next: () => Promise<State>, action: Action<any>, dispatch: Dispatch): Promise<void> {
    if (action instanceof SetUserJwt) {
      const jwt = action.payload.jwt;
      if (jwt.isExpired) {
        await dispatch(new Logout());
      } else {
        this.localStorage.setItem(PersistJwt.JwtKey.toString(), action.payload.jwt.raw);
      }
    }
    if (action instanceof Logout) {
      this.localStorage.removeItem(PersistJwt.JwtKey.toString());
    }
    await next();
  }
}