import {combineReducers} from 'redux';
import {reducer as loginReducer, State as LoginState} from '../login/reducer';
import {reducer as routerReducer, State as RouterState} from '../router/reducer';
import {reducer as userReducer, State as UserState} from '../user/reducer';
import {reducer as coreReducer, State as CoreState} from '../core/reducer';
import {reducer as apiReducer, State as ApiState} from '../api/reducer';
import {reducer as menuReducer, State as MenuState} from '../menu/reducer';

export interface State {
  login: LoginState;
  router: RouterState;
  user: UserState;
  core: CoreState;
  api: ApiState;
  menu: MenuState;
}

export default combineReducers<State>({
  login: loginReducer,
  router: routerReducer,
  user: userReducer,
  core: coreReducer,
  api: apiReducer,
  menu: menuReducer,
});