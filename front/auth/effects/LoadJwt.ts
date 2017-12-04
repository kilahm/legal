import {inject, injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {PersistJwt} from './PersistJwt';
import {Dispatch} from '../../store/Dispatch';
import {Action} from '../../store/Action';
import {LoadUserJwt, SetUserJwt} from '../Actions';
import {decodeJwt} from '../Jwt';

@injectable()
export class LoadJwt implements Effect {

  constructor(
    @inject('localStorage') private localStorage: Storage,
  ) {
  }

  async run(action: Action<any>, dispatch: Dispatch): Promise<void> {
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
