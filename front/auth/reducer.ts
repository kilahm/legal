import {formReducer, modelReducer} from 'react-redux-form';
import {combineReducers} from 'redux';
import {FormState} from '../util';
import {Actions} from './Actions';
import {InvalidJwt, Jwt} from './Jwt';

export interface Model {
  email: string;
  password: string;
}

export interface State extends FormState<Model> {
  jwt: Jwt;
}

const initialValues: Model = {
  email: '',
  password: '',
};

const initialJwt = new InvalidJwt('', ['not logged in']);
export const reducer = combineReducers<State>({
  jwt: (jwt = initialJwt, action) => {
    if (Actions.isSetUserJwt(action)) {
      return action.payload.jwt;
    }
    if (Actions.isLogout(action)) {
      return initialJwt;
    }
    return jwt
  },
  model: modelReducer('auth.model', initialValues),
  form: formReducer('auth.model', initialValues),
});

