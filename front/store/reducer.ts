import {combineReducers} from 'redux';
import {reducer as loginReducer, State as LoginState} from '../login/reducer';
import {reducer as routerReducer, State as RouterState} from '../router/reducer';

export interface State {
  login: LoginState;
  router: RouterState;
}

export default combineReducers<State>({
  login: loginReducer,
  router: routerReducer,
});