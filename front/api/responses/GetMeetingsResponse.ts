import {TypedResponse} from '../Client';
import {Meeting} from '../Meeting';
import {createErrorResponse, ErrorResponse, isTypedErrorResponse} from './ErrorResponse';

export function transformGetMeetingsResponse(response: TypedResponse<any>): TypedResponse<{ [key: string]: Meeting } | ErrorResponse> {
  if (isTypedErrorResponse(response)) {
    return response;
  }

  const {body: {meetings}} = response;

  if (typeof meetings !== 'object') {
    return createErrorResponse();
  }

  const malformedMeetings: { [key: string]: Meeting } = {};
  const transformedMeetings = Object.keys(meetings).reduce(
    (validatedMeetings: { [key: string]: Meeting }, id: string) => {
      const rawMeeting = meetings[id];
      if (typeof rawMeeting.start !== 'number') {
        malformedMeetings[id] = rawMeeting;
        return;
      }
      validatedMeetings[id] = {
        id,
        start: new Date(rawMeeting.start * 1000),
      };
      return validatedMeetings;
    },
    {},
  );
  if (Object.keys(malformedMeetings).length > 0) {
    return createErrorResponse('Some meeting elements were malformed', JSON.stringify(malformedMeetings));
  }
  if(typeof transformedMeetings === 'undefined') {
    return createErrorResponse('Unable to extract meetings from server response', JSON.stringify(response.body));
  }

  return {
    status: 200,
    ok: true,
    body: transformedMeetings,
  };
}

