import {injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {Client} from '../../api/Client';
import {State} from '../../reducer';
import {isErrorResponse} from '../../api/responses/ErrorResponse';
import {isCreateUserResponse} from '../../api/responses/CreateUserResponse';
import {Dispatch} from '../../store/Dispatch';
import {Action} from '../../store/Action';
import {ShowError} from '../../core/ShowError';
import {CreateUser as CreateUserAction} from '../CreateUser';
import {UserCreated} from '../UserCreated';
import {LoginWithEmailAndPassword} from '../../auth/Actions';
import {SetServerState} from '../../api/Actions';

@injectable()
export class CreateUser implements Effect {

  constructor(private api: Client) {
  }

  async run(action: Action<any>, dispatch: Dispatch, getState: () => State): Promise<void> {
    if (!(
        action instanceof CreateUserAction
      )) {
      return;
    }

    const {user, password} = action.payload;
    const response = await this.api.createUser(user, password);
    const body = response.body;

    if (isErrorResponse(body)) {
      await dispatch(new ShowError(body));
    }

    if (isCreateUserResponse(body)) {
      const promises = [];
      promises.push(dispatch(new UserCreated({user: body.user})));

      const adminAlreadyExists = getState().api.state.hasAdmin;
      if (!adminAlreadyExists) {
        promises.push(dispatch(new LoginWithEmailAndPassword({email: user.email, password})));
        promises.push(dispatch(new SetServerState({state: {hasAdmin: true}})));
      }
      await Promise.all(promises);
    }
  }
}