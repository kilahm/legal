export interface TokenRefreshResponse {
  jwt: string;
}

export function isRefreshTokenResponse(subject: any): subject is TokenRefreshResponse {
  return typeof subject === 'object' && typeof subject.jwt === 'string';
}

