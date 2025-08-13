import { OrderItem } from '@/features/orders/types/Orderitem';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapJsonToOrderItem(item: Record<string, any>): OrderItem {
    return {
        id: item.id,
        orderId: item.orderId,
        price: parseFloat(item.price),
        productId: item.productId,
        productName: item.productName || '',
        subtotal: parseFloat(item.subtotal) || 0,
        quantity: parseInt(item.quantity, 10),
        createdAt: new Date(item.createdAt),
        note: item.note || '',
    };
}
