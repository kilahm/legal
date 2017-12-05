import {Effect} from './Effect';
import {State} from '../reducer';
import {Dispatch} from './Dispatch';
import {Action} from './Action';

export class EffectStack {
  constructor(private effects: Effect[]) {
  }

  public push(effect: Effect): void {
    this.effects.push(effect);
  }

  public async run(action: Action<any>, dispatch: Dispatch, getState: () => Readonly<State>): Promise<void> {
    const stack = [...this.effects].reverse();
    let current: Effect | null | undefined = stack.pop();
    const nextResolutions: Array<(state: State) => void> = [];
    const effectPromises: Array<Promise<void>> = [];

    while (current !== null && current !== undefined) {
      const active = current;
      current = null;

      let callNext: () => void;
      const nextCalled = new Promise<void>(resolve => callNext = resolve);
      const nextPromise = new Promise<Readonly<State>>(resolve => nextResolutions.push(resolve));

      const nextCallback = () => {
        callNext();
        current = stack.pop();
        return nextPromise;
      };

      const effectPromise = active.run(nextCallback, action, dispatch, getState);
      effectPromises.push(effectPromise);
      await Promise.race([nextCalled, effectPromise]);
    }
    nextResolutions.forEach(resolve => resolve(getState()));
    await Promise.all(effectPromises);
  }
}