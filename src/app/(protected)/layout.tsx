'use client';

import { DotsLoading } from '@/components/ui/Loading';
import { useAuthManager } from '@/features/auth/hook/useAuthManager';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { token, hydrated, loginWithToken } = useAuthManager();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (!hydrated) return;
        if (!token) {
            router.replace('/login');
        } else {
            loginWithToken(token);
            setChecking(false);
        }
    }, [hydrated, loginWithToken, router, token]);

    if (checking) {
        return (
            <div className='flex items-center justify-center h-screen bg-gray-50'>
                <DotsLoading />
            </div>
        );
    }
    return <>{children}</>;
}
