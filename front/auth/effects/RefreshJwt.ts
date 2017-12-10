import {Effect} from '../../store/Effect';
import {State} from '../../reducer';
import {injectable} from 'inversify';
import {Client} from '../../api/Client';
import {isRefreshTokenResponse} from '../../api/responses/TokenRefreshResponse';
import {Action} from '../../store/Action';
import {Dispatch} from '../../store/Dispatch';
import {decodeJwt} from '../Jwt';
import {SetUserJwt} from '../actions/SetUserJwt';
import {Logout} from '../actions/Logout';

@injectable()
export class RefreshJwt implements Effect {
  private listener: number | null;

  constructor(private api: Client) {
  }

  async run(next: () => Promise<State>, action: Action<any>, dispatch: Dispatch, getState: () => State): Promise<void> {
    await next();
    if (!(
        action instanceof SetUserJwt
      )) {
      return;
    }

    this.stopListening();
    const waitTime = (
      action.payload.jwt.secondsUntilExpired - 60
    ) * 1000;
    this.listener = setTimeout(this.listen(dispatch, getState), waitTime);
  }

  private listen(dispatch: Dispatch, getState: () => State): () => Promise<void> {
    return async () => {
      const jwt = getState().auth.jwt;
      if (!jwt.isValid() || jwt.isExpired) {
        this.stopListening();
        return;
      }
      await this.refreshToken(dispatch);
    };
  }

  private async refreshToken(dispatch: Dispatch): Promise<void> {
    const response = await this.api.refreshToken();
    const {body} = response;
    if (isRefreshTokenResponse(body)) {
      await dispatch(new SetUserJwt({jwt: decodeJwt(body.jwt)}));
      return;
    }

    this.stopListening();
    await dispatch(new Logout());
  }

  private stopListening() {
    if (this.listener === null) {
      return;
    }
    clearTimeout(this.listener);
    this.listener = null;
  }
}