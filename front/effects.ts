import loginEffects from './login/effects/index';
import routerEffects from './router/effects';
import userEffects from './user/effects';
import coreEffects from './core/effects';
import {Effect} from './store/Effect';

export const EffectClasses: Array<{ new (...args: any[]): Effect }> = [
  ...loginEffects,
  ...routerEffects,
  ...userEffects,
  ...coreEffects,
];