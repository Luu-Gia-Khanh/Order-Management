import { useAppStore } from '@/stores';

export function useOrderItemManager() {
    const orderItem = useAppStore((state) => state.orderItem);
    const fetchOrderItems = useAppStore((state) => state.fetchOrderItems);
    const deleteOrderItem = useAppStore((state) => state.deleteOrderItem);
    const getOrderItemByOrderIdAndProductId = useAppStore((state) => state.getOrderItemByOrderIdAndProductId);

    const { loading, error, orderItems } = orderItem;

    return {
        loading,
        error,
        orderItems,

        fetchOrderItems,
        deleteOrderItem,
        getOrderItemByOrderIdAndProductId,
    };
}
