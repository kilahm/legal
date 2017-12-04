import {User} from '../api/User';
import {Action} from '../store/Action';

type Payload = {
  user: User,
};

export class UserCreated extends Action<Payload> {
}
