import * as React from 'react';
import {Control, Errors, Form} from 'react-redux-form';
import {createInjector} from '../container';
import {Model as LoginModel} from './reducer';
import {State} from '../store/reducer';
import {connect, MapStateToProps} from 'react-redux';
import {Actions} from './Actions';

interface LoginProps {
  pending: boolean;
}

type LoginFn = (props: LoginProps) => JSX.Element;
const LoginComponent = (actions: Actions, {pending}: LoginProps): JSX.Element => (
  <Form
    model="login.model"
    validators={{
      email: {required: v => v && v.length},
      password: {required: v => v && v.length},
    }}
    validateOn='submit'
    onSubmit={({email, password}: LoginModel) => actions.loginWithEmailAndPassword(email, password)}
  >

    <Errors model="login.model"/>

    <Errors
      wrapper={({children}) => (
        <div>{children}</div>
      )}
      model=".email"
      show={{touched: true}}
      messages={{
        required: 'Please include your email',
      }}
    />
    <label htmlFor="login-email">
      Email
    </label>
    <Control.input
      type="email"
      id="login-email"
      model=".email"
      className="form-control"
      disabled={pending}
    />

    <Errors
      wrapper={({children}) => (
        <div>{children}</div>
      )}
      model=".password"
      show={{touched: true}}
      messages={{
        required: 'Please include your password',
      }}
    />
    <label htmlFor="login-password">
      Password
    </label>
    <Control.text
      id="login-password"
      model=".password"
      type="password"
      className="form-control"
      disabled={pending}
    />
    <button className="btn btn-primary col-xs-12" type="submit" disabled={pending}>Log In</button>
  </Form>
);

const InjectedLogin = createInjector<Actions>(Actions)<Actions, JSX.Element, LoginFn>(LoginComponent);

const stateMap: MapStateToProps<LoginProps, {}> = (state: State): LoginProps => {
  return {
    pending: state.login.form.$form.pending,
  };
};

export const Login = connect(stateMap)(InjectedLogin);
