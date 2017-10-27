import {Effect} from '../../store/Effect';
import {Client} from '../../api/Client';
import {Action, Dispatch} from 'redux';
import {Actions as CoreActions} from '../Actions';
import {Actions as RouterActions} from '../../router/Actions';
import {Actions as ApiActions} from '../../api/Actions';
import {Actions as LoginActions} from '../../auth/Actions';
import {injectable} from 'inversify';
import * as ReactDOM from 'react-dom';


@injectable()
export class InitializeApp implements Effect {
  constructor(private api: Client) {
  }

  async run(action: Action, dispatch: Dispatch<any>): Promise<void> {
    if (!CoreActions.isInitializeApp(action)) {
      return;
    }

    dispatch(LoginActions.loadUserJwt());
    const {body} = await this.api.getState();

    if (Client.isErrorResponse(body)) {
      dispatch(CoreActions.cannotInit(body.error, body.context));
      dispatch(CoreActions.showError('Unable to load app', 'Invalid server state response'));
    } else {
      dispatch(ApiActions.serverStateFetched(body.state));
    }


    dispatch(RouterActions.setRoute(action.payload.browserRoute));
    ReactDOM.render(action.payload.rootElement, action.payload.domRoot);
  }
}