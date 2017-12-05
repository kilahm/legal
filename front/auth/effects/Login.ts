import {Client} from '../../api/Client';
import {injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {isErrorResponse} from '../../api/responses/ErrorResponse';
import {isLoginResponse} from '../../api/responses/LoginResponse';
import {LoginWithEmailAndPassword, SetUserJwt} from '../Actions';
import {Action} from '../../store/Action';
import {Dispatch} from '../../store/Dispatch';
import {ShowError} from '../../core/ShowError';
import {decodeJwt} from '../Jwt';
import {State} from '../../reducer';

@injectable()
export class Login implements Effect {

  constructor(private api: Client) {
  }

  async run(next: () => Promise<State>, action: Action<any>, dispatch: Dispatch): Promise<void> {
    await next();
    if (!(
        action instanceof LoginWithEmailAndPassword
      )) {
      return;
    }
    const {email, password} = action.payload;
    const {body} = await this.api.login(email, password);

    if (isErrorResponse(body)) {
      await dispatch(new ShowError(body));
      return;
    }

    if (isLoginResponse(body)) {
      await dispatch(new SetUserJwt({jwt: decodeJwt(body.jwt)}));
      return;
    }

    await dispatch(new ShowError(
      {
        error: 'Unable to log in at this time',
        context: 'Unexpected response from server: ' + JSON.stringify(body),
      },
    ));
  }
}