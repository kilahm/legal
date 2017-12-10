import {ReactElement} from 'react';
import {Action} from '../../store/Action';
import {RouteParams} from '../../router/RouteParams';

type Payload = {
  contentRoot: Element,
  contentComponent: ReactElement<any>,
  browserRoute: RouteParams
};

export class InitializeApp extends Action<Payload> {
}
