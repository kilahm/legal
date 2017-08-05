import * as React from 'react';
import {Control, Errors, Form} from 'react-redux-form';
import {createInjector} from '../container.js';
import {Model as LoginModel} from './reducer';
import {Effects} from './Effects';
import {State} from '../store/reducer';
import {connect, MapStateToProps} from 'react-redux';

interface LoginProps {
  pending: boolean;
}

type LoginFn = (props: LoginProps) => JSX.Element;
const LoginComponent = (effects: Effects, {pending}: LoginProps): JSX.Element => (
  <Form
    model="login.model"
    validators={{
      user: {required: v => v && v.length},
    }}
    onSubmit={async ({user, password}: LoginModel) => await effects.login(user, password)}
  >
    <Errors model="login.model"/>
    <label>
      User
      <Control.text
        itemID=""
        model=".user"
        disabled={pending}
      />
    </label>

    <label>
      Password
      <Control.text
        model=".password"
        type="password"
        disabled={pending}
      />
    </label>

    <button type="submit" disabled={pending}>Log In</button>
  </Form>
);

const InjectedLogin = createInjector<Effects>(Effects)<Effects, JSX.Element, LoginFn>(LoginComponent);

const stateMap: MapStateToProps<LoginProps, {}> = (state: State): LoginProps => {
  return {
    pending: state.login.form.$form.pending,
  };
};

export const Login = connect(stateMap)(InjectedLogin);
