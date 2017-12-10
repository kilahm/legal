import {Action} from '../../store/Action';

type CannotInitPayload = { reason: string, context: string };

export class CannotInit extends Action<CannotInitPayload> {
}
