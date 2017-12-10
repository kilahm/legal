import {Action} from '../store/Action';
import {Reducer} from '../store/Reducer';
import {UpdateField} from './actions/UpdateField';

export function createFormReducer<Model>(
  form: Symbol,
  initialValues: Model,
): Reducer<Model> {
  return (action: Action<any>, state: Model = initialValues): Model => {
    if (action instanceof UpdateField && action.payload.form === form) {
      if (!state.hasOwnProperty(action.payload.model)) {
        const models = Object.keys(state).join(', ');
        throw new Error(`Unable to find model ${action.payload.model} in form reducer. Available models: ${models}`);
      }
      return Object.assign(
        state,
        {[action.payload.model]: action.payload.value},
      );
    }
    return state;
  };
}
