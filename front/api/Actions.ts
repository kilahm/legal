import {ServerState} from './ServerState';
import {Action, NullAction} from '../store/Action';

export class ServerStateFetched extends Action<{ state: ServerState }> {
}

export class FetchServerState extends NullAction {
}

export class SetServerState extends Action<{ state: Partial<ServerState> }> {
}
