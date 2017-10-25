import {Effect} from '../../store/Effect';
import {Client} from '../../api/Client';
import {Action, Dispatch} from 'redux';
import {Actions as CoreActions} from '../Actions';
import {Actions as RouterActions} from '../../router/Actions';
import {Actions as ApiActions} from '../../api/Actions';
import {Actions as LoginActions} from '../../login/Actions';
import {inject, injectable} from 'inversify';
import * as ReactDOM from 'react-dom';
import {PersistJwt} from '../../login/effects/PersistJwt';


@injectable()
export class InitializeApp implements Effect {
  constructor(private api: Client, @inject('localStorage') private localStorage: Storage) {
  }

  async run(action: Action, dispatch: Dispatch<any>): Promise<void> {
    if (!CoreActions.isInitializeApp(action)) {
      return;
    }

    const localJwt = this.localStorage.getItem(PersistJwt.JwtKey.toString());
    if (typeof localJwt === 'string') {
      dispatch(LoginActions.setUserJwt(localJwt));
    }
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