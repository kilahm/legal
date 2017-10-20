import {inject, injectable} from 'inversify';
import {Effect} from './Effect';
import {Action, Dispatch, Middleware, MiddlewareAPI} from 'redux';

@injectable()
export class EffectManager {

  constructor(@inject('effects') private effects: Effect[]) {
  }

  public buildMiddleware(): Middleware {
    return <S>(api: MiddlewareAPI<S>) => (next: Dispatch<S>): Dispatch<S> => <A extends Action>(action: A): A => {
      this.effects.forEach(effect => effect.run(action, api.dispatch, api.getState));
      return next(action);
    };
  }
}