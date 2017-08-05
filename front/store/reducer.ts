import {combineReducers} from 'redux';
import {reducer as loginReducer, State as LoginState} from '../login/reducer';

export interface State {
  login: LoginState;
}

export default combineReducers<State>({
  login: loginReducer,
});