import {Action} from '../../store/Action';

type Payload = {
  form: symbol;
  model: string;
  value: string;
}

export class UpdateField extends Action<Payload> {
}