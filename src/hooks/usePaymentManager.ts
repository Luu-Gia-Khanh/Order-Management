import { useAppStore } from '@/stores';

export function usePaymentManager() {
    const payment = useAppStore((state) => state.payment);
    const fetchPaymentMethods = useAppStore((state) => state.fetchPaymentMethods);

    const { loading, error, payments } = payment;

    return {
        loading,
        error,
        payments,
        fetchPaymentMethods,
    };
}
