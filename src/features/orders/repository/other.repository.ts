import { Order } from '../types/Order';
import { OrderItem } from '../types/Orderitem';

export const orderRepository = {
    async fetchAllOrders(): Promise<Order[]> {
        const data = await fetch('/api/order')
            .then((response) => response.json())
            .then((data) => {
                return data as Order[];
            });

        return data ?? [];
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async createOrder(order: any): Promise<Record<string, Order | OrderItem[]> | null> {
        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            }).then((res) => res.json());

            if (!response.ok) {
                throw new Error('Failed to create order');
            }
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw new Error((error as Error).message || 'Failed to create order');
        }
    },

    async deleteOrder(orderId: string): Promise<Order | null> {
        try {
            const response = await fetch(`/api/order/${orderId}`, {
                method: 'DELETE',
            }).then((res) => res.json());

            if (!response.ok) {
                throw new Error('Failed to delete order');
            }
            return response.order;
        } catch (error) {
            console.error('Error deleting order:', error);
            throw new Error((error as Error).message || 'Failed to delete order');
        }
    },

    async updateOrderStatus(
        orderId: string,
        fromStatus: string | null,
        toStatus: string,
        note: string,
        authId: string
    ): Promise<Order | null> {
        try {
            const response = await fetch(`/api/order/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, fromStatus, toStatus, note, authId }),
            }).then((res) => res.json());

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }
            return response.data;
        } catch (error) {
            console.error('Error updating order status:', error);
            throw new Error((error as Error).message || 'Failed to update order status');
        }
    },
};
