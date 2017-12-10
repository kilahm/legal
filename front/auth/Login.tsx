import * as React from 'react';
import {StatelessComponent} from 'react';
import {Input} from '../form/Input';
import {connect, MapDispatchToProps, MapStateToProps} from '../store/connect';
import {LoginForm} from './reducer';
import {Form} from '../form/Form';
import {LoginWithEmailAndPassword} from './actions/LoginWithEmailAndPassword';

interface StateProps {
}

interface DispatchProps {
  login: (email: string, password: string) => void;
}

type Props = StateProps & DispatchProps;

const LoginComponent: StatelessComponent<Props> = ({login}: Props) => (
  <Form
    className="col-xs-4 col-xs-offset-4"
    modelPrefix={'auth.loginForm'}
    submit={data => login(data['email'], data['password'])}
  >
    <label htmlFor="login-email">
      Email
    </label>
    <Input
      type="email"
      id="login-email"
      model="email"
      formId={LoginForm}
      className="form-control"
    />

    <label htmlFor="login-password">
      Password
    </label>
    <Input
      id="login-password"
      formId={LoginForm}
      model="password"
      type="password"
      className="form-control"
    />
    <button className="btn btn-primary" type="submit">Log In</button>
  </Form>
);

const stateMap: MapStateToProps<{}, {}> = (): StateProps => {
  return {};
};

const dispatchMap: MapDispatchToProps<DispatchProps, {}> = dispatch => {
  return {
    login: (email, password) => dispatch(new LoginWithEmailAndPassword({email, password})),
  };
};

export const Login = connect<StateProps, DispatchProps, {}>(stateMap, dispatchMap)(LoginComponent);
