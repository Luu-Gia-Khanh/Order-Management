import path from 'path';
import fs from 'fs';
import { OrderItem } from '@/features/orders/types/Orderitem';

const filePath = path.join(process.cwd(), 'public/data/order_items.json');
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const orderItems: OrderItem[] = JSON.parse(raw);
        const foundOrderItem = orderItems.find((item) => item.id === id);
        if (!foundOrderItem) {
            return new Response(JSON.stringify({ message: 'Order item not found' }), { status: 404 });
        }
        const updatedOrderItems = orderItems.filter((item) => item.id !== id);
        fs.writeFileSync(filePath, JSON.stringify(updatedOrderItems, null, 2), 'utf-8');

        return Response.json({ message: 'Order Item Deleted', orderItem: foundOrderItem, ok: true }, { status: 200 });
    } catch {
        return new Response(JSON.stringify({ message: 'Lỗi đọc file' }), { status: 500 });
    }
}
