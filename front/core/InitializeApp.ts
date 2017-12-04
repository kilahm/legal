import {Action} from '../store/Action';
import {RouteParams} from '../router/RouteParams';

type InitializeAppPayload = {
  rootElement: JSX.Element,
  domRoot: Element,
  browserRoute: RouteParams
};

export class InitializeApp extends Action<InitializeAppPayload> {
}
