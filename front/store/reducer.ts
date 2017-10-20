import {combineReducers} from 'redux';
import {reducer as loginReducer, State as LoginState} from '../login/reducer';
import {reducer as routerReducer, State as RouterState} from '../router/reducer';
import {reducer as userReducer, State as UserState} from '../user/reducer';

export interface State {
  login: LoginState;
  router: RouterState;
  user: UserState;
}

export default combineReducers<State>({
  login: loginReducer,
  router: routerReducer,
  user: userReducer,
});