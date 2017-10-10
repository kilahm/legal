import {Action} from 'redux';
import {injectable} from 'inversify';

@injectable()
export class Actions {
  public static readonly CHANGE_ROUTE: Symbol = Symbol('router.change-route');

  public updateRoute(path: string, query: URLSearchParams|null = null): ChangeRoute {
    return {
      type: Actions.CHANGE_ROUTE,
      payload: {path, query},
    };
  }

  public static isChangeRoute(action: any): action is ChangeRoute {
    return action.type === Actions.CHANGE_ROUTE;
  }
}

export interface ChangeRoute extends Action {
  payload: {
    path: string,
    query: URLSearchParams|null,
  },
}

