import {injectable} from 'inversify';

export interface Http {
  execute(request: Request): Promise<Response>;
}

@injectable()
export class FetchHttp implements Http {
  execute(request: Request): Promise<Response> {
    return fetch(request);
  }
}

@injectable()
export class MockHttp implements Http {
  private responses: Response[] = [];

  public requests: Request[] = [];

  setResponses(responses: Response[]): void {
    this.responses = responses;
  }

  execute(request: Request): Promise<Response> {
    this.requests.push(request);
    return new Promise((resolve, reject) => {
      this.responses.length < 1
        ? reject(new Error('No responses defined in mock http instance'))
        : resolve(this.responses.shift());
    });
  }
}