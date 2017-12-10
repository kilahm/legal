import {InvalidJwt, Jwt} from './Jwt';
import {combineReducers} from '../store/combineReducers';
import {createFormReducer} from '../form/createFormReducer';
import {SetUserJwt} from './actions/SetUserJwt';
import {Logout} from './actions/Logout';

export interface State {
  jwt: Jwt;
  loginForm: LoginFormModel;
}

export interface LoginFormModel {
  email: string,
  password: string,
}

export const LoginForm = Symbol('login form');

const initialFromModel: LoginFormModel = {
  email: '',
  password: '',
};

const initialJwt = new InvalidJwt('', ['not logged in']);
export const reducer = combineReducers<State>({
  jwt: (action, jwt = initialJwt) => {
    if (action instanceof SetUserJwt) {
      return action.payload.jwt;
    }
    if (action instanceof Logout) {
      return initialJwt;
    }
    return jwt;
  },
  loginForm: createFormReducer<LoginFormModel>(LoginForm, initialFromModel),
});

