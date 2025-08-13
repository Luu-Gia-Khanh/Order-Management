import { OrderItem } from '@/features/orders/types/Orderitem';

export const orderItemRepository = {
    async fetchAllOrderItems(): Promise<OrderItem[]> {
        const data = await fetch('/api/order-item')
            .then((response) => response.json())
            .then((data) => {
                return data as OrderItem[];
            });

        return data ?? [];
    },
    async deleteOrderItem(orderItemId: string): Promise<OrderItem | null> {
        try {
            const response = await fetch(`/api/order-item/${orderItemId}`, {
                method: 'DELETE',
            }).then((res) => res.json());

            if (!response.ok) {
                throw new Error('Failed to delete order item');
            }
            return response.orderItem;
        } catch (error) {
            console.error('Error deleting order item:', error);
            throw new Error((error as Error).message || 'Failed to delete order item');
        }
    },
};
