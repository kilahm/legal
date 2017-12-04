export function sleepAsync(time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export interface FormState<Tmodel extends object> {
  model: Tmodel;
}

export function isMapOf<T>(data: any, elementChecker: (element: any) => element is T): data is { [key: string]: T } {
  if (typeof data !== 'object') {
    return false;
  }
  return Object.keys(data).every(key => elementChecker(data[key]));
}

export enum BootstrapType {
  primary = 'primary',
  success = 'success',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  link = 'link',
}

export function getSubState(path: string, state: any): any {
  const pathElements = path.split('.');
  return pathElements.reduce((s, pathElement) => {
    if (typeof s !== 'object' || !s.hasOwnProperty(pathElement)) {
      return null;
    }
    return s[pathElement];
  }, state);
}

