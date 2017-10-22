import {Action} from 'redux';
import {injectable} from 'inversify';
import {actions, FieldAction} from 'react-redux-form';

@injectable()
export class Actions {
  private static readonly EMAIL_PASSWORD: Symbol = Symbol('with email');
  private static readonly SET_JWT = Symbol('set jwt');

  public static setLoginFormErrors(message: string): FieldAction {
    return actions.setErrors('login.model', message);
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

  public static setUserJwt(jwt: string): SetUserJwt {
    return {
      type: Actions.SET_JWT,
      payload: {jwt},
    };
  }

  public static isSetUserJwt(action: any): action is SetUserJwt {
    return action.type === Actions.SET_JWT;
  }

  static setSubmitted(submittedState: boolean): Action {
    return actions.setSubmitted('login.model', submittedState);
  }
}

export interface LoginWithEmailAndPassword extends Action {
  payload: {
    email: string,
    password: string,
  };
}

export interface SetUserJwt extends Action {
  payload: { jwt: string };
}




