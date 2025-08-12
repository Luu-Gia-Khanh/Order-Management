'use client';

import { DotsLoading } from '@/components/ui/Loading';
import { useAuthManager } from '@/features/auth/hook/useAuthManager';
import { useCustomerManager } from '@/features/customers/hook/useCustomerManager';
import { useProductManager } from '@/features/products/hook/useProductManager';
import { useShippingManager } from '@/features/shipping/hook/useShippingManager';
import { usePaymentManager } from '@/hooks/usePaymentManager';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { fetchCustomers } = useCustomerManager();
    const { fetchProducts } = useProductManager();
    const { fetchShippings } = useShippingManager();
    const { fetchPaymentMethods } = usePaymentManager();

    const router = useRouter();
    const { token, hydrated, loginWithToken } = useAuthManager();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (!hydrated) return;
        if (!token) {
            router.replace('/login');
        } else {
            loginWithToken(token);
            fetchCustomers();
            fetchProducts();
            fetchShippings();
            fetchPaymentMethods();
            setChecking(false);
        }
    }, [fetchCustomers, fetchProducts, fetchShippings, fetchPaymentMethods, hydrated, loginWithToken, router, token]);

    if (checking) {
        return (
            <div className='flex items-center justify-center h-screen bg-gray-50'>
                <DotsLoading />
            </div>
        );
    }
    return <>{children}</>;
}
