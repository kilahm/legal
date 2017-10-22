import {inject, injectable} from 'inversify';
import {Http} from './Http';
import {isServerState, ServerState} from './ServerState';
import {isUser, User} from './User';

export class ApiError extends Error {
}

export interface ErrorResponse {
  error: string;
  context: string;
}

export interface TypedResponse<ResponseType> {
  status: number;
  body: ResponseType;
  ok: boolean;
}

export interface LoginResponse {
  jwt: string;
}

export interface ServerStateResponse {
  state: ServerState;
}

export interface CreateUserResponse {
  user: User;
}

@injectable()
export class Client {
  private jwt: string | null = null;
  private static readonly defaultRequestOptions: Partial<RequestInit> = {
    cache: 'no-store',
    credentials: 'omit',
    keepalive: true,
    mode: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'origin-when-cross-origin',
  };

  constructor(@inject('Http') private http: Http) {
  }

  static isErrorResponse(subject: any): subject is ErrorResponse {
    return typeof subject === 'object' && typeof subject.error === 'string';
  }

  async login(email: string, password: string): Promise<TypedResponse<LoginResponse | ErrorResponse>> {
    return await this.post<LoginResponse>('/api/login', {email, password});
  }

  static isLoginResponse(subject: any): subject is LoginResponse {
    return typeof subject === 'object' && typeof subject.jwt === 'string';
  }

  async getState(): Promise<TypedResponse<ServerStateResponse | ErrorResponse>> {
    return await this.get<ServerStateResponse>('/api/state');
  }

  static isServerStateResponse(subject: any): subject is ServerStateResponse {
    return typeof subject === 'object' && isServerState(subject.state);
  }

  async createUser(user: User, password: string): Promise<TypedResponse<CreateUserResponse | ErrorResponse>> {
    return await this.post<CreateUserResponse>('/api/users', {...user, password});
  }

  static isCreateUserResponse(subject: any): subject is CreateUserResponse {
    return typeof subject === 'object' && isUser(subject.user);
  }

  private async post<Tresponse>(
    path: string,
    body: Object,
    options: Partial<RequestInit> = {},
  ): Promise<TypedResponse<Tresponse | ErrorResponse>> {
    return Client.handle<Tresponse>(
      await this.http.execute(new Request(
        path,
        this.requestOptions({
          ...options,
          method: 'POST',
          body: JSON.stringify(body),
        }),
      )),
    );
  }

  private async get<Tresponse>(
    path: string,
    options: Partial<RequestInit> = {},
  ): Promise<TypedResponse<Tresponse | ErrorResponse>> {
    return Client.handle<Tresponse>(
      await this.http.execute(new Request(
        path,
        this.requestOptions({
          ...options,
          method: 'GET',
        }),
      )),
    );
  }

  private requestOptions(options: Partial<RequestInit>): RequestInit {
    return {
      ...Client.defaultRequestOptions,
      ...options,
      headers: this.buildHeaders(options.headers),
    };
  }

  private buildHeaders(headers: Headers | undefined): Headers {
    const heads = new Headers(headers);
    if (this.jwt) {
      heads.set('Authorization', 'Bearer ' + this.jwt);
    }
    heads.set('Accept', 'application/json');
    heads.set('content-type', 'application/json');
    return heads;
  }

  private static async handle<Tresponse>(response: Response): Promise<TypedResponse<Tresponse | ErrorResponse>> {
    const contentType = response.headers.get('content-type') || '';
    if (!/application\/json/i.test(contentType)) {
      throw new ApiError('Response is not JSON');
    }
    const responseBody = await response.json();
    const body = response.ok ? responseBody : Client.buildErrorResponseBody(responseBody);
    return {
      status: response.status,
      body,
      ok: response.ok,
    };
  }

  private static buildErrorResponseBody(responseBody: any): ErrorResponse {
    const error = typeof responseBody.error === 'string' ? responseBody.error : 'Unknown Error';
    const context = typeof responseBody.context !== 'undefined' ? JSON.stringify(responseBody.context) : '';
    return {error, context};
  }
}
