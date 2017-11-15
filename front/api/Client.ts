import {inject, injectable} from 'inversify';
import {Http} from './Http';
import {User} from './User';
import {State} from '../store/reducer';
import {ErrorResponse} from './responses/ErrorResponse';
import {CreateUserResponse} from './responses/CreateUserResponse';
import {LoginResponse} from './responses/LoginResponse';
import {TokenRefreshResponse} from './responses/TokenRefreshResponse';
import {ServerStateResponse} from './responses/ServerStateResponse';
import {CreateMeetingResponse, transformCreateMeetingResponse} from './responses/CreateMeetingResponse';
import {Meeting} from './Meeting';
import {transformGetMeetingsResponse} from './responses/GetMeetingsResponse';

export class ApiError extends Error {
}

export interface TypedResponse<ResponseType> {
  status: number;
  body: ResponseType;
  ok: boolean;
}

@injectable()
export class Client {
  private static readonly defaultRequestOptions: Partial<RequestInit> = {
    cache: 'no-store',
    credentials: 'omit',
    keepalive: true,
    mode: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'origin-when-cross-origin',
  };

  constructor(
    @inject('Http') private http: Http,
    @inject('getStateFactory') private getStateFactory: () => () => State,
  ) {
  }


  async login(email: string, password: string): Promise<TypedResponse<LoginResponse | ErrorResponse>> {
    return await this.post<LoginResponse>('/api/auth', {email, password});
  }

  async getState(): Promise<TypedResponse<ServerStateResponse | ErrorResponse>> {
    return await this.get<ServerStateResponse>('/api/state');
  }

  async createUser(user: User, password: string): Promise<TypedResponse<CreateUserResponse | ErrorResponse>> {
    return await this.post<CreateUserResponse>('/api/users', {...user, password});
  }

  async createMeeting(start: Date): Promise<TypedResponse<Meeting | ErrorResponse>> {
    const payload = {
      start: Math.floor(start.valueOf() / 1000),
    };
    const response = await this.post<CreateMeetingResponse>('/api/meetings', payload);
    return transformCreateMeetingResponse(response);
  }

  async getMeetings(): Promise<TypedResponse<{ [key: string]: Meeting } | ErrorResponse>> {
    return transformGetMeetingsResponse(await this.get('/api/meetings'));
  }

  async refreshToken(): Promise<TypedResponse<TokenRefreshResponse | ErrorResponse>> {
    return await this.get<TokenRefreshResponse>('/api/jwt');
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

  private buildHeaders(headers: Headers | string[][] | undefined): Headers {
    const heads = new Headers(headers);
    const jwt = this.getStateFactory()().auth.jwt.raw;
    if (jwt) {
      heads.set('Authorization', 'Bearer ' + jwt);
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
