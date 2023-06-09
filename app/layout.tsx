import './globals.css';
import AppProvider from './provider';
import MapContainer from '@/components/Map/MapContainer';

export const metadata = {
    title: 'Pub Ranker',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AppProvider>
                    <div className="flex align-middle flex-row ">
                        <div className="shadow-lg h-screen w-96">
                            {children}
                        </div>
                        <MapContainer />
                    </div>
                </AppProvider>
            </body>
        </html>
    );
}
