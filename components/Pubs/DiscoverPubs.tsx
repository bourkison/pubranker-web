'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/services/supabase';
import { getCurrentLocation } from '@/services';
import { DEFAULT_USER_LOCATION_COORDINATES } from '@/constants';
import { TPub } from '@/types';
import DiscoverPub from '@/components/Pubs/DiscoverPub';
import Spinner from '@/components/Utility/Spinner';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setLocation } from '@/store/slices/pub';

export default function DiscoverPubs() {
    const [isLoading, setIsLoading] = useState(false);
    const [pubs, setPubs] = useState<TPub[]>([]);

    const userLocation = useAppSelector(state => state.pub.userLocation);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchPubs = async () => {
            setIsLoading(true);

            let location = userLocation;

            if (!location) {
                location = await getCurrentLocation().catch(
                    () => DEFAULT_USER_LOCATION_COORDINATES,
                );

                dispatch(setLocation(location));
            }

            const { data, error } = await supabase
                .rpc('nearby_pubs', {
                    dist_lat: location.lat,
                    dist_long: location.lng,
                    order_long: location.lng,
                    order_lat: location.lat,
                })
                .limit(10);

            if (error) {
                console.error(error);
                return;
            }

            setPubs(data);
            setIsLoading(false);
        };

        if (!pubs.length && !isLoading) {
            fetchPubs();
        }
    }, [dispatch, userLocation, pubs, isLoading]);

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
