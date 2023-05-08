export const getCurrentLocation = () => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    resolve({ lat: coords.latitude, lng: coords.longitude });
                    return;
                },
                () => {
                    reject();
                    return;
                },
            );
        } else {
            reject();
            return;
        }
    });
};

export const averageReviews = (
    beer: number,
    food: number,
    location: number,
    music: number,
    service: number,
    vibe: number,
) => {
    return (beer + food + location + music + service + vibe) / 6;
};

export const roundToNearest = (input: number, nearest: number): number => {
    return Math.ceil(input / nearest) * nearest;
};
