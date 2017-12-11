import {Action} from '../../store/Action';

interface Payload {
  id: string;
  body: string;
}
export class SetDocument extends Action<Payload> {}