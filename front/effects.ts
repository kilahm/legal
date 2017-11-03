import authEffects from './auth/effects/index';
import routerEffects from './router/effects';
import userEffects from './user/effects';
import coreEffects from './core/effects';
import meetingsEffects from './meetings/effects';
import {Effect} from './store/Effect';

export const EffectClasses: Array<{ new (...args: any[]): Effect }> = [
  ...authEffects,
  ...routerEffects,
  ...userEffects,
  ...coreEffects,
  ...meetingsEffects,
];