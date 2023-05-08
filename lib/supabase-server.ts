import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

const supabaseServer = () =>
    createServerComponentSupabaseClient({
        headers,
        cookies,
    });

export default supabaseServer;
