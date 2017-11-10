export interface ErrorResponse {
  error: string;
  context: string;
}

export function isErrorResponse(subject: any): subject is ErrorResponse {
  return typeof subject === 'object' && typeof subject.error === 'string';
}
