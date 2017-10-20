import {formReducer, modelReducer} from 'react-redux-form';
import {combineReducers} from 'redux';
import {FormState} from '../util';
import {Actions} from './Actions';

export interface Model {
  email: string;
  password: string;
}

export interface State extends FormState<Model> {
  readonly jwt: string;
}

const initialValues: Model = {
  email: '',
  password: '',
};

export const reducer = combineReducers({
  jwt: (jwt = '', action) => Actions.isSetUserJwt(action) ? action.payload.jwt : jwt,
  model: modelReducer('login.model', initialValues),
  form: formReducer('login.model', initialValues),
});

