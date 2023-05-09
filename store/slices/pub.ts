'use client';

import { DEFAULT_USER_LOCATION_COORDINATES } from '@/constants';
import { PubFilters, TPub } from '@/types';
import {
    PayloadAction,
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { getCurrentLocation } from '@/services';
import { applyFilters, supabase } from '@/services/supabase';

const pubAdapter = createEntityAdapter();

const initialState = pubAdapter.getInitialState({
    userLocation: null as typeof DEFAULT_USER_LOCATION_COORDINATES | null,
    filters: {
        searchText: '',
        dogFriendly: 'unset',
        liveSport: 'unset',
        darts: 'unset',
        pool: 'unset',
        sundayRoast: 'unset',
        garden: 'unset',
        kidFriendly: 'unset',
        liveMusic: 'unset',
        boardGames: 'unset',
        freeWifi: 'unset',
        roof: 'unset',
        foosball: 'unset',
        wheelchairAccessible: 'unset',
    } as PubFilters,
    isLoading: false,
    pubs: [] as TPub[],
});

export const searchPubs = createAsyncThunk<TPub[], undefined>(
    'pub/searchPubs',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;

        let location = state.pub.userLocation;

        if (!location) {
            location = await getCurrentLocation().catch(
                () => DEFAULT_USER_LOCATION_COORDINATES,
            );

            dispatch(setLocation(location));
        }

        let query = supabase.rpc('nearby_pubs', {
            dist_lat: location.lat,
            dist_long: location.lng,
            order_long: location.lng,
            order_lat: location.lat,
        });

        query = applyFilters(query, state.pub.filters);

        const { data, error } = await query.limit(10);

        if (error) {
            console.error(error);
            throw error;
        }

        return data;
    },
);

const pubSlice = createSlice({
    name: 'pub',
    initialState,
    reducers: {
        setLocation(
            state,
            action: PayloadAction<typeof DEFAULT_USER_LOCATION_COORDINATES>,
        ) {
            state.userLocation = action.payload;
        },
        setSearchText(state, action: PayloadAction<string>) {
            state.filters.searchText = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(searchPubs.pending, state => {
                state.isLoading = true;
                state.pubs = [];
            })
            .addCase(searchPubs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pubs = action.payload;
            })
            .addCase(searchPubs.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const { setLocation, setSearchText } = pubSlice.actions;
export default pubSlice.reducer;
