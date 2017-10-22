import {injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {Action, Dispatch} from 'redux';
import {Client, CreateUserResponse, ErrorResponse} from '../../api/Client';
import {Actions as UserActions} from '../Actions';
import {Actions as CoreActions} from '../../core/Actions';

@injectable()
export class CreateAdmin implements Effect {

  constructor(private api: Client) {
  }

  async run<S>(action: Action, dispatch: Dispatch<S>): Promise<void> {
    if (!UserActions.isCreateUser(action)) {
      return;
    }
    const {user, password} = action.payload;
    const response = await this.api.createUser(user, password);
    const body = response.body;
    if (Client.isErrorResponse(body)) {
      return CreateAdmin.handleError(body, dispatch);
    }
    if (Client.isCreateUserResponse(body)) {
      return this.handleAdminWasCreated(body, dispatch);
    }
    dispatch(CoreActions.showError('Unexpected response from server', ''));
  }

  private static handleError(responseBody: ErrorResponse, dispatch: Dispatch<any>) {
    dispatch(CoreActions.showError(responseBody.error, responseBody.context));
  }

  private handleAdminWasCreated(responseBody: CreateUserResponse, dispatch: Dispatch<any>) {
    dispatch(UserActions.userCreated(responseBody.user));
  }
}