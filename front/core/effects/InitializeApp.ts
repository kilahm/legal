import {Effect} from '../../store/Effect';
import {Client, ErrorResponse} from '../../api/Client';
import {Action, Dispatch} from 'redux';
import {Actions as CoreActions, InitializeApp as InitAction} from '../Actions';
import {Actions as RouterActions} from '../../router/Actions';
import {injectable} from 'inversify';
import * as ReactDOM from 'react-dom';
import {ServerState} from '../../api/ServerState';


@injectable()
export class InitializeApp implements Effect {
  constructor(private api: Client) {
  }

  async run(action: Action, dispatch: Dispatch<any>): Promise<void> {
    if (!CoreActions.isInitializeApp(action)) {
      return;
    }

    const {body} = await this.api.getState();
    if (Client.isErrorResponse(body)) {
      return InitializeApp.handleGetStateError(body, dispatch);
    }

    InitializeApp.setInitialRoute(body.state, action, dispatch);
    InitializeApp.renderApp(action);
  }

  private static handleGetStateError(body: ErrorResponse, dispatch: Dispatch<any>): void {
    dispatch(CoreActions.cannotInit(body.error, body.context));
    dispatch(CoreActions.showError('Unable to load app', 'Invalid server state response'));
  }

  private static renderApp(action: InitAction): void {
    ReactDOM.render(action.payload.rootElement, action.payload.domRoot);
  }

  private static setInitialRoute(serverState: ServerState, action: InitAction, dispatch: Dispatch<any>): void {
    if(serverState.hasAdmin) {
      dispatch(RouterActions.setRoute(action.payload.browserRoute));
      return;
    }
    dispatch(RouterActions.changeRoute({path: '/createAdmin'}));
  }
}