import * as React from 'react';

export interface MainProps {
    name: string;
}

export const Landing = (props: MainProps) => {
    return <h2>{props.name}</h2>;
};