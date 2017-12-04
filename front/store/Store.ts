import {Action} from './Action';
import {Reducer} from './Reducer';
import {Effect} from './Effect';
import {Subject} from '@reactivex/rxjs/dist/package';
import {StoreInit} from './StoreInit';
import {State} from '../reducer';
import {injectable} from 'inversify';

@injectable()
export class Store {
  readonly state: Subject<State>;
  private _state: State;

  constructor(private effects: Effect[], private reducer: Reducer<State>) {
    this.state = new Subject<State>();
    this._state = reducer(new StoreInit());
    this.state.next(this._state);
  }

  // TODO: effects ARE middleware! :mindblown:
  async dispatch(action: Action<any>): Promise<State> {
    this._state = this.reducer(action, this._state);
    this.state.next(this._state);
    await Promise.all(this.effects.map(effect => effect.run(
      action,
      this.dispatch.bind(this),
      this.getState.bind(this),
    )));
    return this._state;
  }

  public getState(): Readonly<State> {
    return this._state;
  }
}