'client only';

import { supabase } from '@/services/supabase';
import { TPub } from '@/types';
import { useEffect, useState } from 'react';

type DiscoverPubProps = {
    pub: TPub;
    onSelect?: () => void;
};

export default function DiscoverPub({ pub }: DiscoverPubProps) {
    const [imageUrls, setImageUrls] = useState<string[] | null>(null);

    useEffect(() => {
        if (imageUrls === null) {
            let urls: string[] = [];

            pub.photos.forEach(photo => {
                const url = supabase.storage.from('pubs').getPublicUrl(photo);
                urls.push(url.data.publicUrl);
            });

            setImageUrls(urls);
        }
    }, [pub, imageUrls]);

    return <div>{pub.name}</div>;
}
