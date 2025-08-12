import { devtools, persist } from 'zustand/middleware';
import { AuthState, createAuthSlice } from './auth.slice';
import { create } from 'zustand';
import { createCustomerSlice, CustomerState } from './customer.slice';

type StoreState = AuthState & CustomerState;

export const useAppStore = create<StoreState>()(
    devtools(
        persist(
            (...a) => ({
                ...createAuthSlice(...a),
                ...createCustomerSlice(...a),
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
