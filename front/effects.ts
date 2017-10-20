import loginEffects from './login/effects/index';
import routerEffects from './router/effects';
import {Effect} from './store/Effect';

export const EffectClasses: Array<{ new (...args: any[]): Effect }> = [
  ...loginEffects,
  ...routerEffects,
];