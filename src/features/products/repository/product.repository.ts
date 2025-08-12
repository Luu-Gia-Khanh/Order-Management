import { Product } from '../types/Product';

export const productRepository = {
    async fetchAllProducts(): Promise<Product[]> {
        const data = await fetch('/api/product')
            .then((response) => response.json())
            .then((data) => {
                return data as Product[];
            });

        return data ?? [];
    },
};
