export interface Meeting {
  start: Date;
  id: string;
}

export function isMeeting(subject: any): subject is Meeting {
  console.log('checking meeting', subject);
  return typeof subject === 'object'
    && subject.start instanceof Date
    && typeof subject.id === 'string';
}