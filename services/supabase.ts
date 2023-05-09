import { Database } from '@/types/schema';
import { createClient } from '@supabase/supabase-js';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { PubFilters } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const applyFilters = (
    query: PostgrestFilterBuilder<
        Database['public'],
        Database['public']['Functions']['nearby_pubs']['Returns'][number],
        any
    >,
    filters: PubFilters,
): PostgrestFilterBuilder<any, any, any> => {
    if (filters.searchText) {
        query = query.textSearch('name', `'${filters.searchText}'`);
    }

    if (filters.dogFriendly !== 'unset') {
        query = query.eq('dog_friendly', filters.dogFriendly);
    }

    if (filters.liveSport !== 'unset') {
        query = query.eq('live_sport', filters.liveSport);
    }

    if (filters.darts !== 'unset') {
        query = query.eq('dart_board', filters.darts);
    }

    if (filters.pool !== 'unset') {
        query = query.eq('pool_table', filters.pool);
    }

    if (filters.sundayRoast !== 'unset') {
        // TODO:
        console.warn('No sunday roast filter yet');
    }

    if (filters.garden !== 'unset') {
        query = query.eq('beer_garden', filters.garden);
    }

    if (filters.kidFriendly !== 'unset') {
        query = query.eq('kid_friendly', filters.kidFriendly);
    }

    if (filters.liveMusic !== 'unset') {
        query = query.eq('live_music', filters.liveMusic);
    }

    if (filters.boardGames !== 'unset') {
        // TODO:
        console.warn('No board games filter yet');
    }

    if (filters.freeWifi !== 'unset') {
        query = query.eq('free_wifi', filters.freeWifi);
    }

    if (filters.roof !== 'unset') {
        query = query.eq('rooftop', filters.roof);
    }

    if (filters.foosball !== 'unset') {
        query = query.eq('foosball_table', filters.foosball);
    }

    return query;
};
