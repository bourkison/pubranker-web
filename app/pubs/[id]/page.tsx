import { supabase } from '@/services/supabase';

type PubViewProps = {
    params: {
        id: string;
    };
};

async function getPub(pubId: number) {
    const { data, error } = await supabase
        .rpc('get_pub', {
            dist_lat: 0,
            dist_long: 0,
        })
        .eq('id', pubId)
        .limit(1)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export default async function PubView({ params }: PubViewProps) {
    const data = await getPub(parseInt(params.id));

    return <div>{data.name}</div>;
}
