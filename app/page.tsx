import Link from 'next/link';

export default function Home() {
    return (
        <div className="w-52">
            <div>test</div>
            <Link href="/testroute">Link</Link>
        </div>
    );
}
