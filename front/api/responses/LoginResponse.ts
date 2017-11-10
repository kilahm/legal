export interface LoginResponse {
  jwt: string;
}

export function isLoginResponse(subject: any): subject is LoginResponse {
  return typeof subject === 'object' && typeof subject.jwt === 'string';
}


