import * as React from 'react';
import {Control, Form} from 'react-redux-form';
import {connect,} from 'react-redux';
import {State} from '../store/reducer';
import {CreateAdminModel} from './reducer';
import {Actions} from './Actions';
import {Dispatch} from 'redux';
import {Role} from '../api/User';


type CreateAdminProps = CreateAdminDispatchProps & CreateAdminStateProps;

function CreateAdminComponent({pending, createAdmin}: CreateAdminProps): JSX.Element {
  return (
    <Form
      model={'user.createAdmin.model'}
      onSubmit={createAdmin}
    >

      <label htmlFor="create-admin-email">Name</label>
      <Control
        id="create-admin-name"
        model=".name"
        disabled={pending}
      />

      <label htmlFor="create-admin-email">Email</label>
      <Control.input
        type="email"
        id="create-admin-email"
        model=".email"
        disabled={pending}
      />

      <label htmlFor="create-admin-password">Password</label>
      <Control.input
        className=""
        type="password"
        id="create-admin-password"
        model=".password"
        disabled={pending}
      />

      <button type="submit" disabled={pending}>Create Admin</button>
    </Form>
  );
}

interface CreateAdminStateProps {
  pending: boolean;
}

const stateMap = (state: State) => {
  return {
    pending: state.user.createAdmin.form.$form.pending,
  };
};

interface CreateAdminDispatchProps {
  createAdmin: (data: CreateAdminModel) => void;
}

const dispatchMap = (dispatch: Dispatch<any>) => {
  return {
    createAdmin: ({name, email, password}: CreateAdminModel) => dispatch(Actions.createUser(
      {
        name,
        email,
        roles: [Role.ADMIN],
      },
      password,
    )),
  };
};

export const CreateAdmin = connect<CreateAdminStateProps, CreateAdminDispatchProps, {}>(
  stateMap,
  dispatchMap,
)(
  CreateAdminComponent);
