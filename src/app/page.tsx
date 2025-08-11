'use client';
import { useAuthManager } from '@/features/auth/hook/useAuthManager';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    const { token, hydrated } = useAuthManager();
    const router = useRouter();
    useEffect(() => {
        if (!hydrated) return;
        if (token) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    }, [hydrated, router, token]);
    return <></>;
}
