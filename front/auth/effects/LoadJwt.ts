import {inject, injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {PersistJwt} from './PersistJwt';
import {Dispatch} from '../../store/Dispatch';
import {Action} from '../../store/Action';
import {decodeJwt} from '../Jwt';
import {State} from '../../reducer';
import {LoadUserJwt} from '../actions/LoadUserJwt';
import {SetUserJwt} from '../actions/SetUserJwt';

@injectable()
export class LoadJwt implements Effect {

  constructor(
    @inject('localStorage') private localStorage: Storage,
  ) {
  }

  async run(next: () => Promise<State>, action: Action<any>, dispatch: Dispatch): Promise<void> {
    await next();
    if (!(
        action instanceof LoadUserJwt
      )) {
      return;
    }
    const localJwt = this.localStorage.getItem(PersistJwt.JwtKey.toString());
    if (typeof localJwt === 'string') {
      await dispatch(new SetUserJwt({jwt: decodeJwt(localJwt)}));
    }
  }
}
