import {Client} from '../../api/Client';
import {actions} from 'react-redux-form';
import {injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {Actions as RouterActions} from '../../router/Actions';
import {Action, Dispatch} from 'redux';
import {Actions as LoginActions} from '../Actions';

@injectable()
export class Login implements Effect {

  constructor(
    private api: Client,
    private routerActions: RouterActions,
    private loginActions: LoginActions,
  ) {
  }

  readonly shouldRunBeforeReducers = true;

  async run<S>(action: Action, dispatch: Dispatch<S>): Promise<void> {
    if(!LoginActions.isLoginWithEmailAndPassword(action)) {
      return;
    }
    const {email, password} = action.payload;
    const response = await this.api.login(email, password);
    dispatch(this.loginActions.setLoginFormError('login.model', ))
  }

  async login(email: string, password: string): Promise<> {
    try {

      return []
    } catch (e) {
      this.dispatch(actions.setErrors('login.model', e.message));
    }
  }

}