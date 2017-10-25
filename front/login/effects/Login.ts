import {Client, ErrorResponse, LoginResponse} from '../../api/Client';
import {injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {Action, Dispatch} from 'redux';
import {Actions as LoginActions} from '../Actions';
import {Actions as CoreActions} from '../../core/Actions';
import {State} from '../../store/reducer';

@injectable()
export class Login implements Effect {

  constructor(
    private api: Client,
  ) {
  }

  async run(action: Action, dispatch: Dispatch<State>): Promise<void> {
    if (!LoginActions.isLoginWithEmailAndPassword(action)) {
      return;
    }
    const {email, password} = action.payload;
    const {body} = await this.api.login(email, password);
    Login.handleResponse(body, dispatch);
    dispatch(LoginActions.setSubmitted(true));
  }

  private static handleResponse(body: LoginResponse | ErrorResponse, dispatch: Dispatch<any>): void {
    if (Client.isErrorResponse(body)) {
      dispatch(CoreActions.showError(body.error, body.context));
      return;
    }
    if (Client.isLoginResponse(body)) {
      dispatch(LoginActions.setUserJwt(body.jwt));
      return;
    }
    dispatch(CoreActions.showError(
      'Unable to log in at this time',
      'Unexpected response from server: ' + JSON.stringify(body),
    ));
  }
}