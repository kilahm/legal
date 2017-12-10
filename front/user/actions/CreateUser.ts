import {User} from '../../api/User';
import {Action} from '../../store/Action';

type Payload = {
  user: User,
  password: string,
};

export class CreateUser extends Action<Payload> {
}
