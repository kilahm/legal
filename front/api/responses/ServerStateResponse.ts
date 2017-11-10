import {isServerState, ServerState} from '../ServerState';

export interface ServerStateResponse {
  state: ServerState;
}

export function isServerStateResponse(subject: any): subject is ServerStateResponse {
  return typeof subject === 'object' && isServerState(subject.state);
}

