import {defaultMainNavigation, NavigationMenuItem} from './MainNavigation';
import {Reducer} from '../store/Reducer';
import {Action} from '../store/Action';
import {AddMainNavigation} from './AddMainNavigation';

export interface State {
  mainNavigation: NavigationMenuItem[]
}

const defaultState: State = {
  mainNavigation: defaultMainNavigation,
};

export const reducer: Reducer<State> = (action: Action<any>, state: State = defaultState) => {
  if (action instanceof AddMainNavigation) {
    return {
      ...state,
      mainNavigation: [
        ...state.mainNavigation,
        action.payload.menuItem,
      ],
    };
  }
  return state;
};