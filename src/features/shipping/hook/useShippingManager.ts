import { useAppStore } from '@/stores';

export function useShippingManager() {
    const shipping = useAppStore((state) => state.shipping);
    const fetchShippings = useAppStore((state) => state.fetchShippings);

    const { loading, error, shippings } = shipping;

    return {
        loading,
        error,
        shippings,
        fetchShippings,
    };
}
