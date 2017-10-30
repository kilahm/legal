import {combineReducers} from 'redux';
import {reducer as loginReducer, State as LoginState} from '../auth/reducer';
import {reducer as routerReducer, State as RouterState} from '../router/reducer';
import {reducer as userReducer, State as UserState} from '../user/reducer';
import {reducer as coreReducer, State as CoreState} from '../core/reducer';
import {reducer as apiReducer, State as ApiState} from '../api/reducer';
import {reducer as menuReducer, State as MenuState} from '../menu/reducer';
import {reducer as meetingsReducer, State as MeetingsState} from '../meetings/reducer';

export interface State {
  auth: LoginState;
  router: RouterState;
  user: UserState;
  core: CoreState;
  api: ApiState;
  menu: MenuState;
  meetings: MeetingsState
}

export default combineReducers<State>({
  auth: loginReducer,
  router: routerReducer,
  user: userReducer,
  core: coreReducer,
  api: apiReducer,
  menu: menuReducer,
  meetings: meetingsReducer,
});