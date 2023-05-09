import { Database } from './schema';

export type BoolOrUnset = boolean | 'unset';

export type PubFilters = {
    searchText: string;
    dogFriendly: BoolOrUnset;
    liveSport: BoolOrUnset;
    darts: BoolOrUnset;
    pool: BoolOrUnset;
    sundayRoast: BoolOrUnset;
    garden: BoolOrUnset;
    kidFriendly: BoolOrUnset;
    liveMusic: BoolOrUnset;
    boardGames: BoolOrUnset;
    freeWifi: BoolOrUnset;
    roof: BoolOrUnset;
    foosball: BoolOrUnset;
    wheelchairAccessible: BoolOrUnset;
};

// https://stackoverflow.com/a/73083447/11213593
export type NonNullableFields<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};

export type NonNullableField<T, K extends keyof T> = T &
    NonNullableFields<Pick<T, K>>;

export type TPub = NonNullableField<
    Database['public']['Views']['formatted_pubs']['Row'],
    | 'address'
    | 'dist_meters'
    | 'google_id'
    | 'google_overview'
    | 'google_rating'
    | 'google_ratings_amount'
    | 'id'
    | 'location'
    | 'name'
    | 'num_reviews'
    | 'opening_hours'
    | 'phone_number'
    | 'photos'
    | 'review_beer'
    | 'review_food'
    | 'review_location'
    | 'review_music'
    | 'review_service'
    | 'review_vibe'
    | 'saved'
    | 'website'
>;
