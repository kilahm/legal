import {injectable} from 'inversify';
import {Effect} from '../../store/Effect';
import {Action, Dispatch} from 'redux';
import {Client} from '../../api/Client';
import {Actions} from '../Actions';

@injectable()
export class CreateAdmin implements Effect {

  constructor(private api: Client) {
  }

  async run<S>(action: Action, dispatch: Dispatch<S>): Promise<void> {
    console.log('got actin', action);
    if (!Actions.isCreateUser(action)) {
      return;
    }
    const {user, password} = action.payload;
    const response = await this.api.createUser(user, password);
    dispatch(Actions.userCreated(response.user));
  }

}