import * as React from 'react';
import {Control, Errors, Form} from 'react-redux-form';
import {createInjector} from '../container';
import {Model as LoginModel} from './reducer';
import {Effects} from './Effects';
import {State} from '../store/reducer';
import {connect, MapStateToProps} from 'react-redux';

interface LoginProps {
  pending: boolean;
}

type LoginFn = (props: LoginProps) => JSX.Element;
const LoginComponent = (effects: Effects, {pending}: LoginProps): JSX.Element => (
  <div className="col-xs-12">
    <Form
      model="login.model"
      validators={{
        email: {required: v => v && v.length},
        password: {required: v => v && v.length},
      }}
      validateOn='submit'
      onSubmit={async ({email, password}: LoginModel) => await effects.login(email, password)}
    >

      <div className="row">
        <div className="col-xs-12">
          <Errors model="login.model"/>
        </div>
      </div>

      <div className="row">
        <div style={{width: '50%'}} className="center-block">


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
          <div className="form-group">
            <label htmlFor="login-user">
              Email
            </label>
            <Control.input
              type="email"
              id="login-user"
              model=".email"
              className="form-control"
              disabled={pending}
            />
          </div>

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
          <div className="form-group">
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
          </div>
          <button className="btn btn-primary col-xs-12" type="submit" disabled={pending}>Log In</button>
        </div>
      </div>
    </Form>
  </div>
);

const InjectedLogin = createInjector<Effects>(Effects)<Effects, JSX.Element, LoginFn>(LoginComponent);

const stateMap: MapStateToProps<LoginProps, {}> = (state: State): LoginProps => {
  return {
    pending: state.login.form.$form.pending,
  };
};

export const Login = connect(stateMap)(InjectedLogin);
