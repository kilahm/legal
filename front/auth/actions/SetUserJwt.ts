import {Action} from '../../store/Action';
import {Jwt} from '../Jwt';

type Payload = { jwt: Jwt }

export class SetUserJwt extends Action<Payload> {
}

