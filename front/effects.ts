import loginEffects from './login/effects/index';
import {container} from './container';

export default [
  ...loginEffects,
].map(effectClass => container.get(effectClass));