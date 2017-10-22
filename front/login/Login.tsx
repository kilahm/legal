import * as React from 'react';
import {Control, Errors, Form} from 'react-redux-form';
import {Model as LoginModel} from './reducer';
import {State} from '../store/reducer';
import {connect, MapDispatchToProps, MapStateToProps} from 'react-redux';
import {Actions} from './Actions';

interface StateProps {
  pending: boolean;
}

interface DispatchProps {
  login: (email: string, password: string) => void;
}

type AllProps = StateProps & DispatchProps;

const LoginComponent = ({pending, login}: AllProps): JSX.Element => (
  <Form
    className="col-xs-4 col-xs-offset-4"
    model="login.model"
    validators={{
      email: {required: v => v && v.length},
      password: {required: v => v && v.length},
    }}
    validateOn='submit'
    onSubmit={({email, password}: LoginModel) => login(email, password)}
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
    <button className="btn btn-primary" type="submit" disabled={pending}>Log In</button>
  </Form>
);

const stateMap: MapStateToProps<StateProps, {}> = (state: State): StateProps => {
  return {
    pending: state.login.form.$form.pending,
  };
};

const dispatchMap: MapDispatchToProps<DispatchProps, {}> = dispatch => {
  return {
    login: (email, password) => dispatch(Actions.loginWithEmailAndPassword(email, password)),
  };
};

export const Login = connect<StateProps, DispatchProps, {}>(stateMap, dispatchMap)(LoginComponent);
