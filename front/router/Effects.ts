import {inject, injectable} from 'inversify';

@injectable()
export class Effects {
  constructor(
    @inject('history') private history: History,
  ) {
  }

  set route(route: string) {
    this.history.pushState({path: route}, route);
  }
}