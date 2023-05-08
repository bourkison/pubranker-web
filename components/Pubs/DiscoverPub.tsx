'client only';

import { averageReviews, roundToNearest } from '@/services';
import { supabase } from '@/services/supabase';
import { TPub } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type DiscoverPubProps = {
    pub: TPub;
    onSelect?: () => void;
};

export default function DiscoverPub({ pub }: DiscoverPubProps) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (pub.photos[0]) {
            setImageUrl(
                supabase.storage.from('pubs').getPublicUrl(pub.photos[0]).data
                    .publicUrl,
            );
        }
    }, [pub]);

    return (
        <div className="px-5 py-10 flex flex-row justify-between">
            <div className="pr-2">
                <div>
                    <h4>{pub.name}</h4>
                </div>
                <div className="text-sm font-extralight text-slate-500">
                    {roundToNearest(
                        averageReviews(
                            pub.review_beer,
                            pub.review_food,
                            pub.review_location,
                            pub.review_music,
                            pub.review_service,
                            pub.review_vibe,
                        ),
                        0.1,
                    ).toFixed(1)}
                </div>
            </div>
            <div>
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt="Pub Image"
                        className="w-16 h-16"
                        width={64}
                        height={64}
                    />
                ) : undefined}
            </div>
        </div>
    );
}
