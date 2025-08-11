'use client';
import { useAuthManager } from '@/features/auth/hook/useAuthManager';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    const { token, hydrated, loginWithToken } = useAuthManager();
    const router = useRouter();
    useEffect(() => {
        if (!hydrated) return;
        if (token) {
            loginWithToken(token);
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    }, [hydrated, loginWithToken, router, token]);
    return <></>;
}
