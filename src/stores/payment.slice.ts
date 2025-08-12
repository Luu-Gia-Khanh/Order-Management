import { StateCreator } from 'zustand';
import { PaymentMethod } from '@/features/payment/types/PaymentMethod';
import { paymentRepository } from '@/features/payment/repository/payment.repository';

export interface PaymentState {
    payment: {
        payments: PaymentMethod[];
        loading: boolean;
        error: string | null;
    };

    fetchPaymentMethods: () => void;
}

export const createPaymentSlice: StateCreator<PaymentState> = (set) => ({
    payment: {
        payments: [],
        loading: false,
        error: null,
    },

    fetchPaymentMethods: async () => {
        set((state) => ({ payment: { ...state.payment, loading: true, error: null } }));
        try {
            const data = await paymentRepository.fetchAllPaymentMethods();
            set((state) => ({ payment: { ...state.payment, payments: data, loading: false, error: null } }));
        } catch (error) {
            set((state) => ({ payment: { ...state.payment, loading: false, error: (error as Error).message } }));
        }
    },
});
