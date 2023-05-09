'use client';

import { NextPage } from 'next';

type PubViewErrorProps = {
    error?: Error;
};

export default function PubViewError({ error }: PubViewErrorProps) {
    console.log('error', error);

    return <div>Error.</div>;
}
