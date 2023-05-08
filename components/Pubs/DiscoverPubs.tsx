'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/services/supabase';
import { getCurrentLocation } from '@/services';
import { DEFAULT_USER_LOCATION_COORDINATES } from '@/constants';
import { TPub } from '@/types';
import DiscoverPub from '@/components/Pubs/DiscoverPub';
import Spinner from '@/components/Utility/Spinner';

export default function DiscoverPubs() {
    const [isLoading, setIsLoading] = useState(true);
    const [pubs, setPubs] = useState<TPub[]>([]);

    useEffect(() => {
        const fetchPubs = async () => {
            setIsLoading(true);
            let location = await getCurrentLocation().catch(
                () => DEFAULT_USER_LOCATION_COORDINATES,
            );

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

        fetchPubs();
    }, []);

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
                <DiscoverPub pub={pub} key={pub.id} />
            ))}
        </div>
    );
}
