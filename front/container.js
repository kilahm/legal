import {Container} from 'inversify';
import api from './api/provider';
import login from './login/provider';
import store from './store/provider';

const modules = [
    api,
    login,
    store,
];

export const container = new Container();
container.load(...modules);

export function createInjector(...dependencies) {
    return (fn) => {
        const deps = dependencies.map(dep => container.get(dep));
        return fn.bind(fn, ...deps);
    };
}
