import * as React from 'react';
import {Login} from '../login/Login';

export function Landing(): JSX.Element {
  return (
    <div>
      <h1 className="text-center">ELM Minutes</h1>
      <Login/>
    </div>
  );
}

