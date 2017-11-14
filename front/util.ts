import {FieldState, FormState as ReduxFormState} from 'react-redux-form';

export function sleepAsync(time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export interface FormState<Tmodel extends Object> {
  model: Tmodel;
  form: {
    $form: ReduxFormState,
  } & {
    [K in keyof Tmodel]: FieldState
    };
}

export function isMapOf<T>(data: any, elementChecker: (element: any) => element is T): data is { [key: string]: T } {
  if (typeof data !== 'object') {
    return false;
  }
  return Object.keys(data).every(key => elementChecker(data[key]));
}