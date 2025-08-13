import path from 'path';
import fs from 'fs';
import { Order } from '@/features/orders/types/Order';
import { OrderItem } from '@/features/orders/types/Orderitem';

const filePath = path.join(process.cwd(), 'public/data/orders.json');
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const orders: Order[] = JSON.parse(raw);
        const foundOrder = orders.find((item) => item.id === id);
        if (!foundOrder) {
            return new Response(JSON.stringify({ message: 'Order not found' }), { status: 404 });
        }
        const updatedOrders = orders.filter((item) => item.id !== id);
        await deleteOrderItemByOrderId(id);
        fs.writeFileSync(filePath, JSON.stringify(updatedOrders, null, 2), 'utf-8');

        return Response.json({ message: 'Order Deleted', order: foundOrder, ok: true }, { status: 200 });
    } catch {
        return new Response(JSON.stringify({ message: 'Lỗi đọc file' }), { status: 500 });
    }
}
async function deleteOrderItemByOrderId(orderId: string): Promise<void> {
    const filePath = path.join(process.cwd(), 'public/data/order_items.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const orderItems: OrderItem[] = JSON.parse(raw);

    const updatedOrderItems = orderItems.filter((item) => item.orderId !== orderId);
    fs.writeFileSync(filePath, JSON.stringify(updatedOrderItems, null, 2), 'utf-8');
}
