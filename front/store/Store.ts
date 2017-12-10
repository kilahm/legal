import {Action} from './Action';
import {Reducer} from './Reducer';
import {Effect} from './Effect';
import {Subject} from '@reactivex/rxjs/dist/package';
import {StoreInit} from './actions/StoreInit';
import {State} from '../reducer';
import {injectable} from 'inversify';
import {EffectStack} from './EffectStack';

@injectable()
export class Store {
  readonly state: Subject<State>;
  private _state: State;
  private stack: EffectStack;

  constructor(effects: Effect[], private reducer: Reducer<State>) {
    this.state = new Subject<State>();
    this.updateState(new StoreInit());
    this.stack = new EffectStack(effects);
    this.stack.push({
      run: async (_, action) => this.updateState(action),
    });
  }

  async dispatch(action: Action<any>): Promise<Readonly<State>> {
    await this.stack.run(action, this.dispatch.bind(this), this.getState.bind(this));
    return this._state;
  }

  private updateState(action: Action<any>): void {
    this._state = this.reducer(action, this._state);
    this.state.next(this._state);
  }

  public getState(): Readonly<State> {
    return this._state;
  }
}