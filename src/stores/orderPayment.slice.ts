import { StateCreator } from 'zustand';
import { OrderPayment } from '@/features/order-payment/types/OrderPayment';
import { orderPaymentRepository } from '@/features/order-payment/repository/orderPayment.repository';

export interface OrderPaymentState {
    orderPayment: {
        orderPayments: OrderPayment[];
        loading: boolean;
        error: string | null;
    };

    fetchAllOrderPayments: () => void;
    addOrderPayment: ({
        orderId,
        paymentAmount,
        paymentMethod,
        paymentDate,
        note,
        createdBy,
    }: {
        orderId: string;
        paymentAmount: number;
        paymentMethod: string;
        paymentDate: Date;
        note: string;
        createdBy: string;
    }) => void;
}

export const createOrderPaymentSlice: StateCreator<OrderPaymentState> = (set) => ({
    orderPayment: {
        orderPayments: [],
        loading: false,
        error: null,
    },

    fetchAllOrderPayments: async () => {
        set((state) => ({ orderPayment: { ...state.orderPayment, loading: true, error: null } }));
        try {
            const data = await orderPaymentRepository.fetchAllOrderPayment();
            set((state) => ({
                orderPayment: {
                    ...state.orderPayment,
                    orderPayments: data,
                    loading: false,
                    error: null,
                },
            }));
        } catch (error) {
            set((state) => ({
                orderPayment: { ...state.orderPayment, loading: false, error: (error as Error).message },
            }));
        }
    },
    addOrderPayment: async ({
        orderId,
        paymentAmount,
        paymentMethod,
        paymentDate,
        note,
        createdBy,
    }: {
        orderId: string;
        paymentAmount: number;
        paymentMethod: string;
        paymentDate: Date;
        note: string;
        createdBy: string;
    }) => {
        set((state) => ({ orderPayment: { ...state.orderPayment, loading: true, error: null } }));
        try {
            const newPayment = await orderPaymentRepository.addOrderPayment({
                orderId,
                paymentAmount,
                paymentMethod,
                paymentDate,
                note,
                createdBy,
            });
            if (newPayment) {
                set((state) => ({
                    orderPayment: {
                        ...state.orderPayment,
                        orderPayments: [...state.orderPayment.orderPayments, newPayment],
                        loading: false,
                        error: null,
                    },
                }));
            } else {
                throw new Error('Failed to add order payment');
            }
        } catch (error) {
            set((state) => ({
                orderPayment: { ...state.orderPayment, loading: false, error: (error as Error).message },
            }));
        }
    },
});
