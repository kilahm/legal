import * as React from 'react';
import {Route} from './router/Router';
import {Landing} from './landing/Landing';
import {MeetingPage} from './meetings/MeetingPage';

export const routes: Route[] = [
  {
    pattern: /^\/$/,
    factory: () => <Landing/>,
  },
  {
    pattern: /^\/meetings(\/[^\/]+)?$/,
    factory: (matches) => <MeetingPage
      selectedMeetingId={matches[1] ? matches[1].slice(1) : null}
    />,
  },
  {
    pattern: /^\/projects$/,
    factory: () => <h1>Projects page</h1>,
  },
  {
    pattern: /^\/documents$/,
    factory: () => <h1>Documents page</h1>,
  },
];
