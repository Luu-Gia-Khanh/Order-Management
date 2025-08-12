import { useAppStore } from '@/stores';

export function useProductManager() {
    const product = useAppStore((state) => state.product);
    const fetchProducts = useAppStore((state) => state.fetchProducts);

    const { loading, error, products } = product;

    return {
        loading,
        error,
        products,
        fetchProducts,
    };
}
