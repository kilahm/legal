import {formReducer, modelReducer} from 'react-redux-form';
import {combineReducers} from 'redux';
import {FormState} from '../util';

export interface Model {
  user: string;
  password: string;
}

export interface State extends FormState<Model> {
}

const initialValues: Model = {
  user: '',
  password: '',
};

export const reducer = combineReducers({
  model: modelReducer('login.model', initialValues),
  form: formReducer('login.model', initialValues),
});

