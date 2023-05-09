import { Database } from '@/types/schema';
import dayjs from 'dayjs';

let currentLocationPromise: Promise<{ lat: number; lng: number }> | null = null;
export const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
    if (!currentLocationPromise) {
        currentLocationPromise = new Promise<{ lat: number; lng: number }>(
            (resolve, reject) => {
                if ('geolocation' in navigator) {
                    navigator.geolocation.getCurrentPosition(
                        ({ coords }) => {
                            resolve({
                                lat: coords.latitude,
                                lng: coords.longitude,
                            });
                            currentLocationPromise = null;
                            return;
                        },
                        () => {
                            reject();
                            currentLocationPromise = null;
                            return;
                        },
                        {
                            timeout: 10_000,
                        },
                    );
                } else {
                    reject();
                    currentLocationPromise = null;
                    return;
                }
            },
        );
    }

    return currentLocationPromise;
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

export const checkIfOpen = (
    openingHours: Database['public']['Tables']['opening_hours']['Row'][],
): { isOpen: boolean; nextHours: dayjs.Dayjs } => {
    let nextOpeningHours: dayjs.Dayjs | null = null;

    for (let i = 0; i < openingHours.length; i++) {
        const oh = openingHours[i];

        // As some opening hours are '100' for 1am, convert to '0100'
        let openInput = '';
        let closeInput = '';

        for (let j = 0; j < 4 - oh.open_hour.length; j++) {
            openInput += '0';
        }

        for (let j = 0; j < 4 - oh.close_hour.length; j++) {
            closeInput += '0';
        }

        openInput += oh.open_hour;
        closeInput += oh.close_hour;

        let open = dayjs()
            .day(oh.open_day)
            .hour(parseInt(openInput.substring(0, 2), 10))
            .minute(parseInt(openInput.substring(2), 10));

        let close = dayjs()
            .day(oh.close_day)
            .hour(parseInt(closeInput.substring(0, 2), 10))
            .minute(parseInt(closeInput.substring(2), 10));

        // If today is saturday or sunday, need to manipulate dates to allow for more intuitive checking
        if (dayjs().day() === 6 && open.day() === 6 && close.day() === 0) {
            close = close.add(1, 'w');
        } else if (
            dayjs().day() === 0 &&
            open.day() === 6 &&
            close.day() === 0
        ) {
            open = open.subtract(1, 'w');
        }

        if (dayjs().isAfter(open) && dayjs().isBefore(close)) {
            return { isOpen: true, nextHours: close };
        }

        // If today's Saturday, we'll need to push everything ahead by a week for accurate checking.
        if (dayjs().day() === 6) {
            open = open.add(1, 'w');
        }

        // If we haven't set nextOpeningHours
        // OR the time between nextOpeningHours and now is sooner than currently saved
        // AND this time difference is not negative (i.e. in the past)
        if (
            (!nextOpeningHours ||
                open.unix() - dayjs().unix() <
                    nextOpeningHours.unix() - dayjs().unix()) &&
            open.unix() - dayjs().unix() > 0
        ) {
            nextOpeningHours = open;
        }
    }

    // @ts-ignore
    return { isOpen: false, nextHours: nextOpeningHours };
};

export const parseOpeningHours = (
    openingHours: any,
): Database['public']['Tables']['opening_hours']['Row'][] => {
    let oh: Database['public']['Tables']['opening_hours']['Row'][];

    if (typeof openingHours === 'object') {
        oh = openingHours;
    } else if (typeof openingHours === 'string') {
        oh = JSON.parse(openingHours);
    } else {
        throw new Error('Unrecognised type');
    }

    let response: Database['public']['Tables']['opening_hours']['Row'][] = [];

    for (let i = 0; i < oh.length; i++) {
        const openingHour = oh[i];

        if (
            openingHour.close_day === undefined ||
            openingHour.close_day === null
        ) {
            console.warn('No close day at index', i, oh[i]);
            continue;
        }

        if (
            openingHour.open_day === undefined ||
            openingHour.open_day === null
        ) {
            console.warn('No open day at index', i, oh[i]);
            continue;
        }

        if (
            openingHour.close_hour === undefined ||
            openingHour.close_hour === null
        ) {
            console.warn('No close hour at index', i, oh[i]);
            continue;
        }

        if (
            openingHour.open_hour === undefined ||
            openingHour.open_hour === null
        ) {
            console.warn('No open hour at index', i, oh[i]);
            continue;
        }

        response.push(openingHour);
    }

    return response;
};

export const timeString = (input: string): string => {
    let dayjsInput = '';

    for (let i = 0; i < 4 - input.length; i++) {
        dayjsInput += '0';
    }

    dayjsInput += input;

    const hour = parseInt(dayjsInput.substring(0, 2), 10);
    const minute = parseInt(dayjsInput.substring(2, 4), 10);

    if (isNaN(hour) || isNaN(minute)) {
        throw new Error(
            `Not a number, input: ${dayjsInput}, hour: ${hour}, minute: ${minute}`,
        );
    }

    const response = dayjs().hour(hour).minute(minute);

    let output = response.format('h');

    if (response.format('mm') !== '00') {
        output += `:${response.format('mm')}`;
    }

    output += response.format('a');

    return output;
};
