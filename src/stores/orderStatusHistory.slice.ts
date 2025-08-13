import { OrderStatusHistory } from '@/features/order-status-history/types/OrderStatusHistory';
import { StateCreator } from 'zustand';
import { orderStatusHistoryRepository } from '@/features/order-status-history/repository/orderStatusHistory.repository';

export interface OrderStatusHistoryState {
    orderStatusHistory: {
        orderStatusHistories: OrderStatusHistory[];
        loading: boolean;
        error: string | null;
    };

    fetchAllOrderStatusHistory: () => void;
}

export const createOrderStatusHistorySlice: StateCreator<OrderStatusHistoryState> = (set) => ({
    orderStatusHistory: {
        orderStatusHistories: [],
        loading: false,
        error: null,
    },

    fetchAllOrderStatusHistory: async () => {
        set((state) => ({ orderStatusHistory: { ...state.orderStatusHistory, loading: true, error: null } }));
        try {
            const data = await orderStatusHistoryRepository.fetchAllOrderStatusHistory();
            set((state) => ({
                orderStatusHistory: {
                    ...state.orderStatusHistory,
                    orderStatusHistories: data,
                    loading: false,
                    error: null,
                },
            }));
        } catch (error) {
            set((state) => ({
                orderStatusHistory: { ...state.orderStatusHistory, loading: false, error: (error as Error).message },
            }));
        }
    },
});
