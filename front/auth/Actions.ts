import {Jwt} from './Jwt';
import {Action, NullAction} from '../store/Action';

type LoginWithEmailAndPasswordPayload = {
  email: string,
  password: string,
};

export class LoginWithEmailAndPassword extends Action<LoginWithEmailAndPasswordPayload> {
}

export class SetUserJwt extends Action<{ jwt: Jwt }> {
}

export class LoadUserJwt extends NullAction {
}

export class Logout extends NullAction {
}
