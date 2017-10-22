import {Action} from 'redux';
import {RouteParams} from '../router/Actions';

export class Actions {
  private static INIT_APP = Symbol('init app');
  private static CANNOT_INIT = Symbol('cannot init');
  private static SHOW_ERROR = Symbol('show error');

  public static initializeApp(rootElement: JSX.Element, domRoot: Element, browserRoute: RouteParams): InitializeApp {
    return {
      type: Actions.INIT_APP,
      payload: {rootElement, domRoot, browserRoute},
    };
  }

  public static isInitializeApp(action: Action): action is InitializeApp {
    return action.type === Actions.INIT_APP;
  }

  public static cannotInit(reason: string, context: string): CannotInit {
    return {
      type: Actions.CANNOT_INIT,
      payload: {reason, context},
    };
  }

  static showError(error: string, context: string) {
    return {
      type: Actions.SHOW_ERROR,
      payload: {error, context},
    };
  }

  static isShowError(action: Action): action is ShowError {
    return action.type === Actions.SHOW_ERROR;
  }
}

export interface InitializeApp extends Action {
  payload: {
    rootElement: JSX.Element,
    domRoot: Element,
    browserRoute: RouteParams
  }
}

interface CannotInit extends Action {
  payload: { reason: string, context: string };
}

interface ShowError extends Action {
  payload: {
    error: string,
    context: string,
  }
}
