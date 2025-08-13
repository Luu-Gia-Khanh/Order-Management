import path from 'path';
import fs from 'fs';
import { OrderStatusHistory } from '@/features/order-status-history/types/OrderStatusHistory';
import { Order } from '@/features/orders/types/Order';

const filePath = path.join(process.cwd(), 'public/data/orders.json');
export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'public/data/order_status_history.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        const orderStatusHistories: OrderStatusHistory[] = JSON.parse(raw);
        return Response.json(orderStatusHistories);
    } catch {
        return new Response(JSON.stringify({ message: 'Lỗi đọc file' }), { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();

        const raw = fs.readFileSync(filePath, 'utf-8');
        const orders: Order[] = JSON.parse(raw);
        const order = orders.find((o) => o.id === body.orderId);

        if (!order) {
            throw new Error('Order not found');
        }
        order.status = body.toStatus;
        const idx = orders.findIndex((o) => o.id === order.id);
        orders[idx] = order;
        addNewStatusHistory(order.id, body.fromStatus, body.toStatus, body.authId, body.note);
        fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), 'utf-8');

        return Response.json({ message: 'Order Updated', data: order, ok: true }, { status: 200 });
    } catch {
        return new Response(JSON.stringify({ message: 'Lỗi đọc file' }), { status: 500 });
    }
}

async function addNewStatusHistory(
    orderId: string,
    fromStatus: string | null,
    toStatus: string,
    authId: string,
    note: string
): Promise<OrderStatusHistory> {
    const filePath = path.join(process.cwd(), 'public/data/order_status_history.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const orderStatusHistories: OrderStatusHistory[] = JSON.parse(raw);

    const newOrderStatusHistory: OrderStatusHistory = {
        id: new Date().toISOString(),
        orderId,
        fromStatus,
        toStatus,
        changedByAdminId: authId,
        note,
        changedAt: new Date(),
    };

    orderStatusHistories.push(newOrderStatusHistory);

    fs.writeFileSync(filePath, JSON.stringify(orderStatusHistories, null, 2), 'utf-8');

    return newOrderStatusHistory;
}
