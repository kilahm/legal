import {Client} from '../../api/Client';
import {injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {Action, Dispatch} from 'redux';
import {Actions as LoginActions} from '../Actions';

@injectable()
export class Login implements Effect {

  constructor(
    private api: Client,
    private loginActions: LoginActions,
  ) {
  }

  async run<S>(action: Action, dispatch: Dispatch<S>): Promise<void> {
    if (!LoginActions.isLoginWithEmailAndPassword(action)) {
      return;
    }
    const {email, password} = action.payload;
    try {
      const response = await this.api.login(email, password);
      dispatch(this.loginActions.setUserJwt(response.jwt));
    } catch (e) {
      dispatch(this.loginActions.setLoginFormErrors(e.message));
    }
  }
}