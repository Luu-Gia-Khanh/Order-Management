import { devtools, persist } from 'zustand/middleware';
import { AuthState, createAuthSlice } from './auth.slice';
import { create } from 'zustand';
import { createCustomerSlice, CustomerState } from './customer.slice';
import { createProductSlice, ProductState } from './product.slice';
import { createShippingSlice, ShippingState } from './shipping.slice';
import { createPaymentSlice, PaymentState } from './payment.slice';

type StoreState = AuthState & CustomerState & ProductState & ShippingState & PaymentState;

export const useAppStore = create<StoreState>()(
    devtools(
        persist(
            (...a) => ({
                ...createAuthSlice(...a),
                ...createCustomerSlice(...a),
                ...createProductSlice(...a),
                ...createShippingSlice(...a),
                ...createPaymentSlice(...a),
            }),
            {
                name: 'order-management-store',
                partialize: (state) => ({
                    token: state.token,
                }),
                onRehydrateStorage: () => (state, error) => {
                    if (!error) {
                        setTimeout(() => {
                            useAppStore.setState({ hydrated: true });
                        }, 0);
                    }
                },
            }
        )
    )
);
