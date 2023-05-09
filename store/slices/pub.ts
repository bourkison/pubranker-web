'use client';

import { DEFAULT_USER_LOCATION_COORDINATES } from '@/constants';
import {
    PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';

const pubAdapter = createEntityAdapter();

const initialState = pubAdapter.getInitialState({
    userLocation: null as typeof DEFAULT_USER_LOCATION_COORDINATES | null,
});

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
    },
});

export const { setLocation } = pubSlice.actions;
export default pubSlice.reducer;
