import {Action} from 'redux';
import {injectable} from 'inversify';

@injectable()
export class Actions {
  public static readonly CHANGE_ROUTE: Symbol = Symbol('change route');
  private static SET_ROUTE: Symbol = Symbol('set route');

  public setRoute(params: RouteParams): ChangeRoute {
    return {
      type: Actions.SET_ROUTE,
      payload: params,
    };
  }

  public static isSetRoute(action: any): action is ChangeRoute {
    return action.type === Actions.SET_ROUTE;
  }

  public changeRoute(params: RouteParams): ChangeRoute {
    return {
      type: Actions.CHANGE_ROUTE,
      payload: params,
    };
  }

  public static isChangeRoute(action: any): action is ChangeRoute {
    return action.type === Actions.CHANGE_ROUTE;
  }
}

export interface ChangeRoute extends Action {
  payload: RouteParams;
}

export interface RouteParams {
  path: string;
  query?: string | null;
  title?: string | null;
}