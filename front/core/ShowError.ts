import {Action} from '../store/Action';

type ShowErrorPayload = {
  error: string,
  context: string,
};

export class ShowError extends Action<ShowErrorPayload> {
}
