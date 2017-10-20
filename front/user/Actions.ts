import {User} from '../user/User';
import {Action} from 'redux';

export class Actions {
  private static readonly CREATE_USER: Symbol = Symbol('create user');
  private static readonly USER_CREATED: Symbol = Symbol('user created');

  public static createUser(user: User, password: string): CreateAdmin {
    console.log('created create user action');
    return {
      type: Actions.CREATE_USER,
      payload: {user, password},
    };
  }

  public static isCreateUser(action: Action): action is CreateAdmin {
    return action.type === Actions.CREATE_USER;
  }

  public static userCreated(user: User): UserCreated {
    return {
      type: Actions.USER_CREATED,
      payload: {user},
    };
  }
}

export interface CreateAdmin extends Action {
  payload: {
    user: User,
    password: string,
  };
}

export interface UserCreated extends Action {
  payload: {
    user: User,
  };
}