import {Reducer} from '../store/Reducer';
import {combineReducers} from '../store/combineReducers';
import {createFormReducer} from '../form/createFormReducer';

export interface CreateAdminModel {
  name: string;
  email: string;
  password: string;
}

export const createAdminForm = Symbol('create admin');
const createAdminInitialValues: CreateAdminModel = {
  name: '',
  email: '',
  password: '',
};

export interface State {
  createAdmin: {
    model: CreateAdminModel
  }
}

export const reducer: Reducer<State> = combineReducers({
  createAdmin: combineReducers({
    model: createFormReducer<CreateAdminModel>(createAdminForm, createAdminInitialValues),
  }),
});

