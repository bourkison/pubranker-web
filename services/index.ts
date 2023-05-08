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
