import { StateCreator } from 'zustand';
import { OrderItem } from '@/features/orders/types/Orderitem';
import { orderItemRepository } from '@/features/order-item/repository/orderItem.repository';

export interface OrderItemState {
    orderItem: {
        orderItems: OrderItem[];
        loading: boolean;
        error: string | null;
    };

    fetchOrderItems: () => void;
    deleteOrderItem: (orderItemId: string) => Promise<OrderItem | null>;
    getOrderItemByOrderIdAndProductId: (orderId: string, productId: string) => OrderItem | null;
}

export const createOrderItemSlice: StateCreator<OrderItemState> = (set, get) => ({
    orderItem: {
        orderItems: [],
        loading: false,
        error: null,
    },

    fetchOrderItems: async () => {
        set((state) => ({ orderItem: { ...state.orderItem, loading: true, error: null } }));
        try {
            const data = await orderItemRepository.fetchAllOrderItems();
            set((state) => ({ orderItem: { ...state.orderItem, orderItems: data, loading: false, error: null } }));
        } catch (error) {
            set((state) => ({ orderItem: { ...state.orderItem, loading: false, error: (error as Error).message } }));
        }
    },
    deleteOrderItem: async (orderItemId: string) => {
        set((state) => ({ orderItem: { ...state.orderItem, loading: true, error: null } }));
        try {
            const deletedOrderItem = await orderItemRepository.deleteOrderItem(orderItemId);
            set((state) => ({
                orderItem: {
                    ...state.orderItem,
                    orderItems: state.orderItem.orderItems.filter((item) => item.id !== orderItemId),
                    loading: false,
                    error: null,
                },
            }));
            return deletedOrderItem;
        } catch (error) {
            set((state) => ({ orderItem: { ...state.orderItem, loading: false, error: (error as Error).message } }));
            return null;
        }
    },
    getOrderItemByOrderIdAndProductId: (orderId: string, productId: string) => {
        const { orderItems } = get().orderItem;
        return orderItems.find((item) => item.orderId === orderId && item.productId === productId) || null;
    },
});
