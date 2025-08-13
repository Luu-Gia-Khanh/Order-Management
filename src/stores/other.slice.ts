import { StateCreator } from 'zustand';
import { Order } from '@/features/orders/types/Order';
import { orderRepository } from '@/features/orders/repository/other.repository';

export interface OrderState {
    order: {
        orders: Order[];
        loading: boolean;
        error: string | null;
    };

    fetchOrders: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createOrder: (order: any) => Promise<void>;
    deleteOrder: (orderId: string) => Promise<Order | null>;
    updateOrderStatus: (
        orderId: string,
        fromStatus: string,
        toStatus: string,
        note: string,
        authId: string
    ) => Promise<void>;
}

export const createOrderSlice: StateCreator<OrderState> = (set, get) => ({
    order: {
        orders: [],
        loading: false,
        error: null,
    },

    fetchOrders: async () => {
        set((state) => ({ order: { ...state.order, loading: true, error: null } }));
        try {
            const data = await orderRepository.fetchAllOrders();
            set((state) => ({ order: { ...state.order, orders: data, loading: false, error: null } }));
        } catch (error) {
            set((state) => ({ order: { ...state.order, loading: false, error: (error as Error).message } }));
        }
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createOrder: async (order: any) => {
        set((state) => ({ order: { ...state.order, loading: true, error: null } }));
        try {
            const data = await orderRepository.createOrder(order);
            if (!data) {
                throw new Error('Failed to create order');
            }
            const newOrder = data.order as Order;
            const orders = [...get().order.orders];
            const idxOrder = orders.findIndex((o) => o.id === newOrder.id);
            if (idxOrder !== -1) {
                orders[idxOrder] = newOrder;
            } else {
                orders.push(newOrder);
            }
            set((state) => ({
                order: {
                    ...state.order,
                    orders: orders,
                    loading: false,
                    error: null,
                },
                orderItem: {},
            }));
        } catch (error) {
            set((state) => ({ order: { ...state.order, loading: false, error: (error as Error).message } }));
        }
    },

    deleteOrder: async (orderId: string) => {
        set((state) => ({ order: { ...state.order, loading: true, error: null } }));
        try {
            const deletedOrder = await orderRepository.deleteOrder(orderId);
            if (!deletedOrder) {
                throw new Error('Failed to delete order');
            }
            const orders = get().order.orders.filter((o) => o.id !== deletedOrder.id);
            set((state) => ({
                order: {
                    ...state.order,
                    orders: orders,
                    loading: false,
                    error: null,
                },
            }));
            return deletedOrder;
        } catch (error) {
            set((state) => ({ order: { ...state.order, loading: false, error: (error as Error).message } }));
            return null;
        }
    },

    updateOrderStatus: async (orderId: string, fromStatus: string, toStatus: string, note: string, authId: string) => {
        set((state) => ({ order: { ...state.order, loading: true, error: null } }));
        try {
            const updatedOrder = await orderRepository.updateOrderStatus(orderId, fromStatus, toStatus, note, authId);
            if (!updatedOrder) {
                throw new Error('Failed to update order status');
            }
            const orders = get().order.orders.map((o) =>
                o.id === updatedOrder.id ? { ...o, status: updatedOrder.status } : o
            );
            set((state) => ({
                order: {
                    ...state.order,
                    orders: orders,
                    loading: false,
                    error: null,
                },
            }));
        } catch (error) {
            set((state) => ({ order: { ...state.order, loading: false, error: (error as Error).message } }));
        }
    },
});
