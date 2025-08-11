import { devtools, persist } from 'zustand/middleware';
import { AuthState, createAuthSlice } from './auth.slice';
import { create } from 'zustand';

type StoreState = AuthState;

export const useAppStore = create<StoreState>()(
    devtools(
        persist(
            (...a) => ({
                ...createAuthSlice(...a),
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
