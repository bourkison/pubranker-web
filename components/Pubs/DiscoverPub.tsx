'client only';

import { RATINGS_COLOR } from '@/constants';
import {
    averageReviews,
    checkIfOpen,
    parseOpeningHours,
    roundToNearest,
    timeString,
} from '@/services';
import { supabase } from '@/services/supabase';
import { TPub } from '@/types';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { IoStar } from 'react-icons/io5';

type DiscoverPubProps = {
    pub: TPub;
    onSelect?: () => void;
};

export default function DiscoverPub({ pub }: DiscoverPubProps) {
    const [imageUrl, setImageUrl] = useState('');

    const nextOpenHours = useMemo(
        () => checkIfOpen(parseOpeningHours(pub.opening_hours)),
        [pub],
    );

    useEffect(() => {
        if (pub.photos[0]) {
            setImageUrl(
                supabase.storage.from('pubs').getPublicUrl(pub.photos[0]).data
                    .publicUrl,
            );
        }
    }, [pub]);

    return (
        <div className="px-5 py-10 flex flex-row justify-between items-center  border-b-neutral-200 border-b hover:bg-neutral-100 hover:cursor-pointer">
            <div className="pr-2">
                <div>
                    <h4 className="font-medium">{pub.name}</h4>
                </div>
                <div className="text-sm font-extralight text-neutral-400 flex flex-row items-center">
                    <div>
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
                    <div className="ml-0.5 mr-1">
                        <IoStar color={RATINGS_COLOR} />
                    </div>
                    <div>({pub.num_reviews})</div>
                </div>
                <div className="text-sm font-light">
                    {pub.address.split(',')[0]}
                </div>
                <div className="text-sm flex flex-row">
                    {nextOpenHours.isOpen ? (
                        <div>
                            <span className="text-green-700">Open Now</span>
                            <span className="font-extralight text-neutral-400">
                                {' '}
                                ⋅ Closes{' '}
                                {timeString(
                                    nextOpenHours.nextHours.format('HHmm'),
                                )}
                            </span>
                        </div>
                    ) : (
                        <div>
                            <span className="text-red-700">Closed</span>
                            <span className="font-extralight text-neutral-400">
                                {' '}
                                ⋅ Opens{' '}
                                {timeString(
                                    nextOpenHours.nextHours.format('HHmm'),
                                )}
                            </span>
                        </div>
                    )}
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
