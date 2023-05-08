'use client';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import styles from './Map.module.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? '';

export default function Map() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<mapboxgl.Map>();

    useEffect(() => {
        if (!mapContainer || !mapContainer.current) {
            return;
        }

        setMap(
            new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/light-v10',
                center: [-0.056349, 51.553064],
                zoom: 8,
            }),
        );
    }, []);

    return <div className={styles.map} ref={mapContainer}></div>;
}
