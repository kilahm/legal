import * as React from 'react';
import {Control, Errors, Form} from 'react-redux-form';
import {createInjector} from '../container';
import {Model as LoginModel} from './reducer';
import {Effects} from './Effects';
import {State} from '../store/reducer';
import {connect, MapStateToProps} from 'react-redux';
// import * as styles from './style.css';

interface LoginProps {
  pending: boolean;
}

type LoginFn = (props: LoginProps) => JSX.Element;
const LoginComponent = (effects: Effects, {pending}: LoginProps): JSX.Element => (
  <Form
    model="login.model"
    validators={{
      user: {required: v => v && v.length},
      password: {required: v => v && v.length},
    }}
    validateOn='submit'
    onSubmit={async ({user, password}: LoginModel) => await effects.login(user, password)}
  >
    <Errors model="login.model"/>
    <label htmlFor="login-user">
      User
      <Control.text
        id="login-user"
        model=".user"
        disabled={pending}
      />
      <Errors
        wrapper={({children}) => (
          <div>{children}</div>
        )}
        model=".user"
        show={{touched: true}}
        messages={{
          required: 'Please include your user name',
        }}
      />
    </label>

    <label>
      Password
      <Control.text
        model=".password"
        type="password"
        disabled={pending}
      />
      <Errors
        model=".password"
        show={{touched: true, focus: false}}
        messages={{
          required: 'Please include your password',
        }}
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
