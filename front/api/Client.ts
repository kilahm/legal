import {inject, injectable} from 'inversify';
import {Http} from './Http';

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

  async login(email: string, password: string): Promise<void> {
    const response = await this.post<LoginResponse>('/api/login', {email, password});
    if (!response.ok) {
      throw new ApiError('Unable to log in');
    }
    this.jwt = response.body.jwt;
  }

  private requestOptions(options: Partial<RequestInit>): RequestInit {
    return {
      ...Client.defaultRequestOptions,
      ...options,
      headers: this.buildHeaders(options.headers),
    };
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
