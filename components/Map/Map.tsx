'use client';
import { useCallback } from 'react';
import styles from './Map.module.css';

import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import { DEFAULT_USER_LOCATION_COORDINATES } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCurrentLocation } from '@/services';
import { setLocation } from '@/store/slices/pub';

export default function Map() {
    // const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? '';
    const googleMapsApiKey = '';

    // const googleMapsApiID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID ?? '';
    const googleMapsApiID = '';

    const userLocation = useAppSelector(state => state.pub.userLocation);
    const dispatch = useAppDispatch();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleMapsApiKey,
        id: 'google-map-script',
    });

    const onLoad = useCallback(
        (map: google.maps.Map) => {
            const centerOnUserLocation = async () => {
                // Get/update location if not already retrieved to center on it.
                const getLocation = async () => {
                    let location = userLocation;

                    if (!location) {
                        location = await getCurrentLocation().catch(
                            () => DEFAULT_USER_LOCATION_COORDINATES,
                        );

                        dispatch(setLocation(location));
                    }

                    return location;
                };

                const center = await getLocation();
                const bounds = new window.google.maps.LatLngBounds(center);
                map.fitBounds(bounds, 100);
            };

            centerOnUserLocation();
        },
        [dispatch, userLocation],
    );

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
