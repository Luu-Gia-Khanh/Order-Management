import { StateCreator } from 'zustand';
import { ShippingUnit } from '@/features/shipping/types/ShippingUnit';
import { shippingRepository } from '@/features/shipping/repository/shipping.repository';

export interface ShippingState {
    shipping: {
        shippings: ShippingUnit[];
        loading: boolean;
        error: string | null;
    };

    fetchShippings: () => void;
}

export const createShippingSlice: StateCreator<ShippingState> = (set) => ({
    shipping: {
        shippings: [],
        loading: false,
        error: null,
    },

    fetchShippings: async () => {
        set((state) => ({ shipping: { ...state.shipping, loading: true, error: null } }));
        try {
            const data = await shippingRepository.fetchAllShippings();
            set((state) => ({ shipping: { ...state.shipping, shippings: data, loading: false, error: null } }));
        } catch (error) {
            set((state) => ({ shipping: { ...state.shipping, loading: false, error: (error as Error).message } }));
        }
    },
});
