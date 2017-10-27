import {Container, interfaces} from 'inversify';
import api from './api/provider';
import login from './auth/provider';
import router from './router/provider';
import store from './store/provider';
import user from './user/provider';
import core from './core/provider';
import ServiceIdentifier = interfaces.ServiceIdentifier;

const modules = [
  api,
  login,
  store,
  router,
  user,
  core,
];

export const container = new Container();
container.load(...modules);

type DepInjector1 = <T1, R, Tfinal>(fn: (
  arg1: T1,
  ...rest: any[]
) => R) => Tfinal;

type DepInjector2 = <T1, T2, R, Tfinal>(fn: (
  arg1: T1,
  arg2: T2,
  ...rest: any[]
) => R) => Tfinal;

type DepInjector3 = <T1, T2, T3, R, Tfinal>(fn: (
  arg1: T1,
  arg2: T2,
  arg3: T3,
  ...rest: any[]
) => R) => Tfinal;

type DepInjector4 = <T1, T2, T3, T4, R, Tfinal>(fn: (
  arg1: T1,
  arg2: T2,
  arg3: T3,
  arg4: T4,
  ...rest: any[]
) => R) => Tfinal;

export function createInjector<T1>(
  dep1: ServiceIdentifier<T1>,
): DepInjector1

export function createInjector<T1, T2>(
  dep1: ServiceIdentifier<T1>,
  dep2: ServiceIdentifier<T2>,
): DepInjector2

export function createInjector<T1, T2, T3>(
  dep1: ServiceIdentifier<T1>,
  dep2: ServiceIdentifier<T2>,
  dep3: ServiceIdentifier<T3>,
): DepInjector3

export function createInjector<T1, T2, T3, T4>(
  dep1: ServiceIdentifier<T1>,
  dep2: ServiceIdentifier<T2>,
  dep3: ServiceIdentifier<T3>,
  dep4: ServiceIdentifier<T4>,
): DepInjector4

export function createInjector(...dependencies: ServiceIdentifier<any>[]) {
  return (fn: Function) => {
    const deps = dependencies.map(dep => container.get(dep));
    return fn.bind(fn, ...deps);
  };
}

