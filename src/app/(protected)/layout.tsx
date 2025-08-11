'use client';

import { useAuthManager } from '@/features/auth/hook/useAuthManager';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { token, hydrated } = useAuthManager();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (!hydrated) return;
        if (!token) {
            router.replace('/login');
        } else {
            setChecking(false);
        }
    }, [hydrated, router, token]);

    if (checking) {
        return (
            <div className='flex justify-center items-center h-screen text-4xl bg-white text-primary'>Loading...</div>
        );
    }
    return <>{children}</>;
}
