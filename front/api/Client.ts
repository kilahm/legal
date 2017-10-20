import {inject, injectable} from 'inversify';
import {Http} from './Http';
import {ServerState} from './ServerState';
import {User} from '../user/User';

export class ApiError extends Error {
}

interface TypedResponse<ResponseType> {
  status: number;
  body: ResponseType;
  ok: boolean;
}

interface LoginResponse {
  jwt: string;
}

interface ServerStateResponse {
  state: ServerState;
}

interface CreateUserResponse {
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

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.post<LoginResponse>('/api/login', {email, password});
    if (!response.ok) {
      throw new ApiError('Unable to log in');
    }
    return response.body;
  }

  async getState(): Promise<ServerState> {
    const response = await this.get<ServerStateResponse>('/api/state');
    if (!response.ok) {
      throw new ApiError('Unable to get server state');
    }
    return response.body.state;
  }

  async createUser(user: User, password: string): Promise<CreateUserResponse> {
    const response = await this.post<CreateUserResponse>('/api/users', {...user, password});
    if (!response.ok) {
      throw new ApiError('Unable to create user');
    }
    return response.body;
  }

  private async post<Tresponse>(
    path: string,
    body: Object,
    options: Partial<RequestInit> = {},
  ): Promise<TypedResponse<Tresponse>> {
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
  ): Promise<TypedResponse<Tresponse>> {
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

  private static async handle<Tresponse>(response: Response): Promise<TypedResponse<Tresponse>> {
    const contentType = response.headers.get('content-type') || '';
    if (!/application\/json/i.test(contentType)) {
      throw new ApiError('Response is not JSON');
    }
    return {
      status: response.status,
      body: await response.json(),
      ok: response.ok,
    };
  }
}
