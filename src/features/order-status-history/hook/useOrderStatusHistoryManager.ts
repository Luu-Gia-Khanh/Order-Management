import { useAppStore } from '@/stores';

export function useOrderStatusHistoryManager() {
    const orderStatusHistory = useAppStore((state) => state.orderStatusHistory);
    const fetchAllOrderStatusHistory = useAppStore((state) => state.fetchAllOrderStatusHistory);

    const { loading, error, orderStatusHistories } = orderStatusHistory;

    return {
        loading,
        error,
        orderStatusHistories,

        fetchAllOrderStatusHistory,
    };
}
