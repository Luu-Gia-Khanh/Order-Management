import path from 'path';
import fs from 'fs';
import { OrderItem } from '@/features/orders/types/Orderitem';

const filePath = path.join(process.cwd(), 'public/data/order_items.json');

export async function GET() {
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const orderItems: OrderItem[] = JSON.parse(raw);
        return Response.json(orderItems);
    } catch {
        return new Response(JSON.stringify({ message: 'Lỗi đọc file' }), { status: 500 });
    }
}
