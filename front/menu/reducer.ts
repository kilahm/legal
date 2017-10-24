import {Reducer} from 'redux';
import {defaultMainNavigation, NavigationMenuItem} from './MainNavigation';

export interface State {
  mainNavigation: NavigationMenuItem[]
}

const defaultState: State = {
  mainNavigation: defaultMainNavigation
};

export const reducer: Reducer<State> = (state = defaultState) => {
  return state;
};