'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuthManager } from '@/features/auth/hook/useAuthManager';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

export default function LoginPage() {
    const { userLogin, token, error } = useAuthManager();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = useCallback(() => {
        userLogin(username, password);
    }, [password, userLogin, username]);

    useEffect(() => {
        if (token) {
            router.push('/dashboard');
        }
    }, [router, token]);

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex flex-col items-center border-1 border-amber-100 p-10 rounded-lg shadow-lg bg-white w-96'>
                <Input
                    label='Username'
                    fullWidth={false}
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className='mt-5'></div>
                <Input
                    label='Password'
                    fullWidth={false}
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className='mt-5'></div>
                {error && <div className='text-red-500 text-sm mb-4'>{error}</div>}
                <Button onClick={handleLogin}>Submit</Button>
            </div>
        </div>
    );
}
