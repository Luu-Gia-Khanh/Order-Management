'use client';

import { DotsLoading } from '@/components/ui/Loading';
import { useAuthManager } from '@/features/auth/hook/useAuthManager';
import { useBankAccountManager } from '@/features/bank-account/hook/useBankAccountManager';
import { useCustomerManager } from '@/features/customers/hook/useCustomerManager';
import { useOrderItemManager } from '@/features/order-item/hook/useOrderItemManager';
import { useOrderPaymentManager } from '@/features/order-payment/hook/useOrderPaymentManager';
import { useOrderStatusHistoryManager } from '@/features/order-status-history/hook/useOrderStatusHistoryManager';
import { useOrderManager } from '@/features/orders/hook/useOrderManager';
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
    const { fetchOrders } = useOrderManager();
    const { fetchBankAccounts } = useBankAccountManager();
    const { fetchOrderItems } = useOrderItemManager();
    const { fetchAllOrderStatusHistory } = useOrderStatusHistoryManager();
    const { fetchAllOrderPayment } = useOrderPaymentManager();

    const router = useRouter();
    const { token, hydrated, loginWithToken, fetchAuths } = useAuthManager();
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
            fetchOrders();
            fetchBankAccounts();
            fetchOrderItems();
            fetchAuths();
            fetchAllOrderStatusHistory();
            fetchAllOrderPayment();
            setChecking(false);
        }
    }, [
        fetchCustomers,
        fetchProducts,
        fetchShippings,
        fetchPaymentMethods,
        hydrated,
        loginWithToken,
        router,
        token,
        fetchOrders,
        fetchBankAccounts,
        fetchOrderItems,
        fetchAuths,
        fetchAllOrderStatusHistory,
        fetchAllOrderPayment,
    ]);

    if (checking) {
        return (
            <div className='flex items-center justify-center h-screen bg-gray-50'>
                <DotsLoading />
            </div>
        );
    }
    return <>{children}</>;
}
