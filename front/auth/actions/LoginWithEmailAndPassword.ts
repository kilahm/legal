import {Action} from '../../store/Action';

type Payload = {
  email: string,
  password: string,
};

export class LoginWithEmailAndPassword extends Action<Payload> {
}
