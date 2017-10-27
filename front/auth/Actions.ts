import {Action} from 'redux';
import {injectable} from 'inversify';
import {actions, FieldAction} from 'react-redux-form';
import {decodeJwt, Jwt} from './Jwt';

@injectable()
export class Actions {
  private static readonly EMAIL_PASSWORD: Symbol = Symbol('with email');
  private static readonly SET_JWT = Symbol('set jwt');
  private static readonly LOAD_JWT = Symbol('load jwt');
  private static readonly LOGOUT = Symbol('log out');

  public static setLoginFormErrors(message: string): FieldAction {
    return actions.setErrors('auth.model', message);
  }

  public static loginWithEmailAndPassword(email: string, password: string): LoginWithEmailAndPassword {
    return {
      type: Actions.EMAIL_PASSWORD,
      payload: {email, password},
    };
  }

  public static isLoginWithEmailAndPassword(action: any): action is LoginWithEmailAndPassword {
    return action.type === Actions.EMAIL_PASSWORD;
  }

  public static setUserJwt(rawJwt: string): SetUserJwt {
    return {
      type: Actions.SET_JWT,
      payload: {
        jwt: decodeJwt(rawJwt),
      },
    };
  }

  public static isSetUserJwt(action: Action): action is SetUserJwt {
    return action.type === Actions.SET_JWT;
  }

  public static loadUserJwt(): LoadUserJwt {
    return {
      type: Actions.LOAD_JWT,
    };
  }

  public static isLoadUserJwt(action: Action): action is LoadUserJwt {
    return action.type === Actions.LOAD_JWT;
  }

  static setSubmitted(submittedState: boolean): Action {
    return actions.setSubmitted('auth.model', submittedState);
  }

  static logout(): Logout {
    return {
      type: Actions.LOGOUT,
    };
  }

  static isLogout(action: Action): action is Logout {
    return action.type === Actions.LOGOUT;
  }
}

export interface LoginWithEmailAndPassword extends Action {
  payload: {
    email: string,
    password: string,
  };
}

export interface SetUserJwt extends Action {
  payload: { jwt: Jwt };
}

export interface LoadUserJwt extends Action {
}

export interface Logout extends Action {
}
