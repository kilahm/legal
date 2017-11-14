import {TypedResponse} from '../Client';

export interface ErrorResponse {
  error: string;
  context: string;
}

export function isErrorResponse(subject: any): subject is ErrorResponse {
  return typeof subject === 'object' && typeof subject.error === 'string';
}

export function isTypedErrorResponse(subject: TypedResponse<any>): subject is TypedResponse<ErrorResponse> {
  return isErrorResponse(subject.body);
}

export function createErrorResponse(message: string = '', context: string = ''): TypedResponse<ErrorResponse> {
  message = message.length > 0 ? message : 'Unexpected response from server';
  return {
    ok: false,
    body: {
      error: message,
      context,
    },
    status: 600,
  };
}