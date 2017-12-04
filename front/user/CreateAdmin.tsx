import * as React from 'react';
import {State} from '../reducer';
import {createAdminForm, CreateAdminModel} from './reducer';
import {Role} from '../api/User';
import {Form} from '../form/Form';
import {Input} from '../form/Input';
import {connect, MapDispatchToProps} from '../store/connect';
import {Dispatch} from '../store/Dispatch';
import {CreateUser} from './CreateUser';


type Props = DispatchProps & StateProps;

function isModel(model: any): model is CreateAdminModel {
  return typeof model === 'object'
    && typeof model.name === 'string'
    && typeof model.email === 'string'
    && typeof model.password === 'string';
}

function CreateAdminComponent({pending, createAdmin, adminExists}: Props) {
  if (adminExists) {
    return (
      <h1>Root account already exists</h1>
    );
  }
  return (
    <Form
      modelPrefix={'user.createAdmin.model'}
      submit={model => isModel(model) ? createAdmin(model) : null}
    >

      <label htmlFor="create-admin-email">Name</label>
      <Input
        id="create-admin-name"
        formId={createAdminForm}
        model="name"
        disabled={pending}
      />

      <label htmlFor="create-admin-email">Email</label>
      <Input
        type="email"
        formId={createAdminForm}
        id="create-admin-email"
        model="email"
        disabled={pending}
      />

      <label htmlFor="create-admin-password">Password</label>
      <Input
        className=""
        formId={createAdminForm}
        type="password"
        id="create-admin-password"
        model="password"
        disabled={pending}
      />

      <button type="submit" disabled={pending}>Create Root</button>
    </Form>
  );
}

interface StateProps {
  pending: boolean;
  adminExists: boolean;
}

const stateMap = (state: State) => {
  return {
    pending: false,
    adminExists: state.api.state.hasAdmin,
  };
};

interface DispatchProps {
  createAdmin: (data: CreateAdminModel) => void;
}

const dispatchMap: MapDispatchToProps<DispatchProps, {}> = (dispatch: Dispatch) => {
  return {
    createAdmin: ({name, email, password}: CreateAdminModel) => dispatch(new CreateUser(
      {
        user: {
          name,
          email,
          roles: [Role.ADMIN],
        },
        password,
      },
    )),
  };
};

export const CreateAdmin = connect<StateProps, DispatchProps, {}>(
  stateMap,
  dispatchMap,
)(CreateAdminComponent);
