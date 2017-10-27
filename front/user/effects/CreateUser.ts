import {injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {Action, Dispatch} from 'redux';
import {Client} from '../../api/Client';
import {Actions as UserActions} from '../Actions';
import {Actions as CoreActions} from '../../core/Actions';
import {Actions as LoginActions} from '../../auth/Actions';
import {Actions as ApiActions} from '../../api/Actions';
import {State} from '../../store/reducer';

@injectable()
export class CreateUser implements Effect {

  constructor(private api: Client) {
  }

  async run(action: Action, dispatch: Dispatch<State>, getState: () => State): Promise<void> {
    if (!UserActions.isCreateUser(action)) {
      return;
    }


    const {user, password} = action.payload;
    const response = await this.api.createUser(user, password);
    const body = response.body;

    if (Client.isErrorResponse(body)) {
      dispatch(CoreActions.showError(body.error, body.context));
      return;
    }

    if (Client.isCreateUserResponse(body)) {
      dispatch(UserActions.userCreated(body.user));

      const adminAlreadyExists = getState().api.state.hasAdmin;
      if (!adminAlreadyExists) {
        dispatch(LoginActions.loginWithEmailAndPassword(user.email, password));
        dispatch(ApiActions.setServerSate({hasAdmin: true}));
      }

      return;
    }

    dispatch(CoreActions.showError('Unexpected response from server', ''));
  }
}