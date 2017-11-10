import {Meeting} from '../Meeting';
import {TypedResponse} from '../Client';
import {ErrorResponse, isErrorResponse} from './ErrorResponse';

export interface CreateMeetingResponse {
  meeting: {
    id: string,
    start: number,
  };
}

export function isCreateMeetingResponse(subject: any): subject is CreateMeetingResponse {
  return typeof subject === 'object'
    && typeof subject.meeting === 'object'
    && typeof subject.meeting.id === 'string'
    && typeof subject.meeting.start === 'number';
}

export function transformCreateMeetingResponse(response: TypedResponse<any>): TypedResponse<Meeting | ErrorResponse> {
  const {body} = response;
  if (isErrorResponse(body)) {
    return response;
  }

  if (isCreateMeetingResponse(body)) {
    return {
      ...response,
      body: {
        id: body.meeting.id,
        start: new Date(body.meeting.start * 1000),
      },
    };
  }
  return {
    ok: false,
    status: 600,
    body: {
      error: 'Unexpected response from server',
      context: JSON.stringify(response.body),
    },
  };
}
