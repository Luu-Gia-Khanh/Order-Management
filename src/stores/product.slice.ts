import { StateCreator } from 'zustand';
import { Product } from '@/features/products/types/Product';
import { productRepository } from '@/features/products/repository/product.repository';

export interface ProductState {
    product: {
        products: Product[];
        loading: boolean;
        error: string | null;
    };

    fetchProducts: () => void;
}

export const createProductSlice: StateCreator<ProductState> = (set) => ({
    product: {
        products: [],
        loading: false,
        error: null,
    },

    fetchProducts: async () => {
        set((state) => ({ product: { ...state.product, loading: true, error: null } }));
        try {
            const data = await productRepository.fetchAllProducts();
            set((state) => ({ product: { ...state.product, products: data, loading: false, error: null } }));
        } catch (error) {
            set((state) => ({ product: { ...state.product, loading: false, error: (error as Error).message } }));
        }
    },
});
