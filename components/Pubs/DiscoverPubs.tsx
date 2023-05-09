'use client';
import { useEffect } from 'react';
import DiscoverPub from '@/components/Pubs/DiscoverPub';
import Spinner from '@/components/Utility/Spinner';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { searchPubs } from '@/store/slices/pub';

export default function DiscoverPubs() {
    const isLoading = useAppSelector(state => state.pub.isLoading);
    const pubs = useAppSelector(state => state.pub.pubs);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(searchPubs());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="flex justify-center mt-5">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="overflow-y-scroll max-h-screen">
            {pubs.map(pub => (
                <Link key={pub.id} href={`/pubs/${pub.id}`}>
                    <DiscoverPub pub={pub} />
                </Link>
            ))}
        </div>
    );
}
