import { supabase } from '@/services/supabase';

type PubViewProps = {
    params: {
        id: string;
    };
};

export default async function PubView({ params }: PubViewProps) {
    const { data, error } = await supabase
        .rpc('get_pub', {
            dist_lat: 0,
            dist_long: 0,
        })
        .eq('id', params.id)
        .limit(1)
        .single();

    if (error) {
        return <div>{JSON.stringify(error)}</div>;
    }

    return <div>{data.name}</div>;
}
