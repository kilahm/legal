import {Effect} from '../../store/Effect';
import {Client} from '../../api/Client';
import {LoadUserJwt} from '../../auth/Actions';
import {injectable} from 'inversify';
import * as ReactDOM from 'react-dom';
import {isErrorResponse} from '../../api/responses/ErrorResponse';
import {CannotInit} from '../CannotInit';
import {ShowError} from '../ShowError';
import {SetRoute} from '../../router/SetRoute';
import {InitializeApp as InitAction} from '../InitializeApp';
import {Dispatch} from '../../store/Dispatch';
import {Action} from '../../store/Action';
import {ServerStateFetched} from '../../api/Actions';
import {State} from '../../reducer';


@injectable()
export class InitializeApp implements Effect {
  constructor(private api: Client) {
  }

  async run(next: () => Promise<State>, action: Action<any>, dispatch: Dispatch): Promise<void> {
    await next();
    if (!(
        action instanceof InitAction
      )) {
      return;
    }

    const promises: Array<Promise<any>> = [];
    const stateAfterJwtLoad = await dispatch(new LoadUserJwt());
    const {body} = await this.api.getState();

    if (isErrorResponse(body)) {
      promises.push(dispatch(new CannotInit({reason: body.error, context: body.context})));
      promises.push(dispatch(new ShowError({error: 'Unable to load app', context: 'Invalid server state response'})));
    } else {
      promises.push(dispatch(new ServerStateFetched({state: body.state})));
    }

    if (stateAfterJwtLoad.auth.jwt.isValid()) {
      promises.push(dispatch(new SetRoute(action.payload.browserRoute)));
    } else {
      promises.push(dispatch(new SetRoute({path: '/'})));
    }
    await Promise.all(promises);
    ReactDOM.render(action.payload.contentComponent, action.payload.contentRoot);
    ReactDOM.render(action.payload.navComponent, action.payload.navRoot);
  }
}