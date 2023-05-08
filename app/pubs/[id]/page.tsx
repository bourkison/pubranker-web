import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { supabase } from '@/services/supabase';
import { TPub } from '@/types';

type PubViewProps = {
    params: {
        id: string;
    };
};

// async function getData() {

// }

export default function PubView({ params }: PubViewProps) {
    return <div>{params.id}</div>;
}

// export async function generateStaticParams() {
//     const { data, error } = await supabase.rpc('get_pub', {
//         dist_lat: 0,
//         dist_long: 0,
//     });

//     if (error) {
//         throw error;
//     }

//     return {

//     }
// }

export async function getStaticProps() {}

// export async function getStaticPaths() {
//     return {
//         paths: {
//             [{

//             }]
//         }
//     }
// }

// export async function getServerSideProps() {

//     return {
//         props: {
//             pub: data,
//         },
//     };
// }
