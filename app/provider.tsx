'use client';

import { Provider } from 'react-redux';
import store from '@/store';

type AppProviderProps = {
    children: React.ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
    return <Provider store={store}>{children}</Provider>;
}
