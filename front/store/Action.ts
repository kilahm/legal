export class Action<Payload> {
  constructor(readonly payload: Payload) {
  }
}

export class NullAction extends Action<undefined> {
  constructor() {
    super(undefined);
  }
}