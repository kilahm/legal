import {formReducer, modelReducer} from 'react-redux-form';
import {combineReducers} from 'redux';
import {FormState} from '../util';

export interface CreateAdminModel {
  name: string;
  email: string;
  password: string;
}

const createAdminInitialValues: CreateAdminModel = {
  name: '',
  email: '',
  password: '',
};

export interface State extends FormState<CreateAdminModel> {
  createAdmin: FormState<CreateAdminModel>
}

export const reducer = combineReducers({
  createAdmin: combineReducers({
    model: modelReducer('user.createAdmin.model', createAdminInitialValues),
    form: formReducer('user.createAdmin.model', createAdminInitialValues),
  }),
});

