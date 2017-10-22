import {Action} from 'redux';
import {User} from '../api/User';

export class Actions {
  private static readonly CREATE_ADMIN: Symbol = Symbol('create admin');
  private static readonly CREATE_USER: Symbol = Symbol('create user');
  private static readonly USER_CREATED: Symbol = Symbol('user created');

  public static createAdmin(user: User, password: string): CreateAdmin {
    console.log('created create user action');
    return {
      type: Actions.CREATE_ADMIN,
      payload: {user, password},
    };
  }

  public static isCreateAdmin(action: Action): action is CreateAdmin {
    return action.type === Actions.CREATE_ADMIN;
  }

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

export interface CreateUser extends Action {
  payload: {
    user: User,
    password: string,
  };
}

export interface CreateAdmin extends CreateUser {
}

export interface UserCreated extends Action {
  payload: {
    user: User,
  };
}