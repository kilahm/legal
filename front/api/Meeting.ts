export interface Meeting {
  start: Date;
  id: string;
}

export function isMeeting(subject: any): subject is Meeting {
  return typeof subject === 'object'
    && subject.start instanceof Date
    && typeof subject.id === 'string';
}