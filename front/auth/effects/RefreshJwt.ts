import {Effect} from '../../store/Effect';
import {State} from '../../store/reducer';
import {Action, Dispatch} from 'redux';
import {Actions} from '../Actions';
import {injectable} from 'inversify';
import {Client} from '../../api/Client';

@injectable()
export class RefreshJwt implements Effect {
  private listener: number | null;
  constructor(private api: Client) {
  }

  async run(action: Action, dispatch: Dispatch<State>, getState: () => State): Promise<void> {
    if (!Actions.isSetUserJwt(action)) {
      return;
    }

    this.stopListening();
    const waitTime =  (action.payload.jwt.secondsUntilExpired - 60) * 1000;
    this.listener = setTimeout(this.listen(dispatch, getState), waitTime);
  }

  private listen(dispatch: Dispatch<State>, getState: () => State): () => Promise<void> {
    return async () => {
      const jwt = getState().auth.jwt;
      if (!jwt.isValid() || jwt.isExpired) {
        this.stopListening();
        return;
      }
      await this.refreshToken(dispatch);
    };
  }

  private async refreshToken(dispatch: Dispatch<State>): Promise<void> {
    const response = await this.api.refreshToken();
    const {body} = response;
    if (Client.isRefreshTokenResponse(body)) {
      dispatch(Actions.setUserJwt(body.jwt));
      return;
    }

    this.stopListening();
    dispatch(Actions.logout());
  }

  private stopListening() {
    if (this.listener === null) {
      return;
    }
    clearTimeout(this.listener);
    this.listener = null;
  }
}