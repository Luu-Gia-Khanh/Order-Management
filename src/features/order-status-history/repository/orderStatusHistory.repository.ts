import { OrderStatusHistory } from '../types/OrderStatusHistory';

export const orderStatusHistoryRepository = {
    async fetchAllOrderStatusHistory(): Promise<OrderStatusHistory[]> {
        const data = await fetch('/api/order/status')
            .then((response) => response.json())
            .then((data) => {
                return data as OrderStatusHistory[];
            });

        return data ?? [];
    },
};
