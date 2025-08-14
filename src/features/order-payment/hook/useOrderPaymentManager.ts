import { useAppStore } from '@/stores';

export function useOrderPaymentManager() {
    const orderPayment = useAppStore((state) => state.orderPayment);
    const fetchAllOrderPayment = useAppStore((state) => state.fetchAllOrderPayments);
    const addOrderPayment = useAppStore((state) => state.addOrderPayment);

    const { loading, error, orderPayments } = orderPayment;

    return {
        loading,
        error,
        orderPayments,

        fetchAllOrderPayment,
        addOrderPayment,
    };
}
