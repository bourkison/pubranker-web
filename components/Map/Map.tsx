'use client';
import { useCallback } from 'react';
import styles from './Map.module.css';

import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import { DEFAULT_USER_LOCATION_COORDINATES } from '@/constants';

export default function Map() {
    // const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? '';
    const googleMapsApiKey = '';

    // const googleMapsApiID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID ?? '';
    const googleMapsApiID = '';

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleMapsApiKey,
        id: 'google-map-script',
    });

    const onLoad = useCallback((map: google.maps.Map) => {
        const center = DEFAULT_USER_LOCATION_COORDINATES;
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        // setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        return () => {
            // setMap(null);
        };
    }, []);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.map + ' bg-red-600'}>
            <GoogleMap
                options={{
                    clickableIcons: false,
                    disableDefaultUI: true,
                    gestureHandling: 'greedy',
                    mapId: googleMapsApiID,
                }}
                mapContainerClassName={styles.map}
                onLoad={onLoad}></GoogleMap>
        </div>
    );
}
