import {Action} from 'redux';
import {ServerState} from './ServerState';

export class Actions {
  private static readonly FETCH_SERVER_STATE = Symbol('fetch server state');
  private static readonly SERVER_STATE_FETCHED = Symbol('server state fetched');
  private static SET_SERVER_STATE = Symbol('set server state');

  public static fetchServerState(): FetchServerState {
    return {
      type: Actions.FETCH_SERVER_STATE,
      payload: {},
    };
  }

  public static isFetchServerState(action: Action): action is FetchServerState {
    return action.type === Actions.FETCH_SERVER_STATE;
  }

  public static serverStateFetched(state: ServerState): ServerStateFetched {
    return {
      type: Actions.SERVER_STATE_FETCHED,
      payload: {state},
    };
  }

  public static isServerStateFetched(action: Action): action is ServerStateFetched {
    return action.type === Actions.SERVER_STATE_FETCHED;
  }

  static setServerSate(state: Partial<ServerState>): SetServerState {
    return {
      type: Actions.SET_SERVER_STATE,
      payload: {
        state,
      },
    };
  }

  public static isSetServerState(action: Action): action is SetServerState {
    return action.type === Actions.SET_SERVER_STATE;
  }
}

interface ServerStateFetched extends Action {
  payload: {
    state: ServerState
  }
}

interface FetchServerState extends Action {
  payload: {}
}

interface SetServerState extends Action {
  payload: {
    state: Partial<ServerState>
  }
}
