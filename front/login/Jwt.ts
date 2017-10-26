import * as jwt_decode from 'jwt-decode';
import {isUser, User} from '../api/User';

export function decodeJwt(raw: string): Jwt {
  let claims: Claims | null = null;
  try {
    claims = jwt_decode<Claims>(raw);
  } catch (err) {
    return new InvalidJwt(raw, ['Unable to decode raw jwt']);
  }
  const errors = claimErrors(claims);
  if (errors.length > 0) {
    console.log(errors);
    return new InvalidJwt(raw, errors);
  }
  return new ValidJwt(raw, claims);
}

export interface Jwt {
  readonly claims: Claims | null;
  readonly errors: string[];
  readonly isExpired: boolean;
  readonly raw: string;

  isValid(): this is ValidJwt;
}

export class InvalidJwt implements Jwt {
  isValid(): this is ValidJwt {
    return false;
  }

  readonly claims = null;
  readonly isExpired = true;

  constructor(readonly raw: string, readonly errors: string[]) {
  }
}

export class ValidJwt implements Jwt {
  readonly errors = [];

  constructor(readonly raw: string, readonly claims: Claims) {
  }

  isValid(): this is ValidJwt {
    return this.claims.nbf < Date.now();
  }

  get isExpired(): boolean {
    return this.claims.exp < Math.floor(Date.now() / 1000);
  }
}

export interface Claims {
  nbf: number;
  iat: number;
  exp: number;
  user: User;
}

function claimErrors(claims: any): string[] {
  const errors = [];

  if (typeof claims !== 'object') {
    return ['Claims is not a JSON object'];
  }
  if (typeof claims.iat !== 'number') {
    errors.push('Invalid issued at claim');
  }
  if (typeof claims.nbf !== 'number') {
    errors.push('Invalid not before claim');
  }
  if (typeof claims.exp !== 'number') {
    errors.push('Invalid expires claim');
  }
  if (!isUser(claims.user)) {
    errors.push('Invalid user claim');
  }
  return errors;
}
