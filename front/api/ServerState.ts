export interface ServerState {
  hasAdmin: boolean;
}

export function isServerState(subject: any): subject is ServerState {
  return typeof subject === 'object' && typeof subject.hasAdmin === 'boolean';
}