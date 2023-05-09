'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchText } from '@/store/slices/pub';
import { ChangeEvent, FormEvent, useCallback } from 'react';

export default function SearchBar() {
    const searchText = useAppSelector(state => state.pub.filters.searchText);
    const dispatch = useAppDispatch();

    const updateSearchText = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(setSearchText(e.target.value));
        },
        [dispatch],
    );

    const search = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            console.log(searchText);
        },
        [searchText],
    );

    return (
        <div className="bg-neutral-100 w-96 rounded-3xl absolute z-50 h-10 top-5 left-5 flex items-center">
            <form onSubmit={search}>
                <input
                    className="bg-transparent w-full h-full px-4 my-auto outline-none"
                    type="text"
                    value={searchText}
                    placeholder="Search pubs..."
                    onChange={updateSearchText}
                />
            </form>
        </div>
    );
}
