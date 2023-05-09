'use client';

import Map from '@/components/Map/Map';
import SearchBar from '@/components/Filters/SearchBar';

export default function MapContainer() {
    return (
        <div className="relative">
            <SearchBar />
            <Map />
        </div>
    );
}
