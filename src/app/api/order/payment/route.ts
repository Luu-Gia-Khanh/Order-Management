import path from 'path';
import fs from 'fs';
import { OrderPayment } from '@/features/order-payment/types/OrderPayment';
import { addOrderPayment } from '../route';

const filePath = path.join(process.cwd(), 'public/data/order_payments.json');
export async function GET() {
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const orderPayments: OrderPayment[] = JSON.parse(raw);
        return Response.json(orderPayments);
    } catch {
        return new Response(JSON.stringify({ message: 'Lỗi đọc file' }), { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const orderPayments: OrderPayment | null = await addOrderPayment({
            orderId: body.orderId,
            paymentAmount: body.paymentAmount,
            paymentMethod: body.paymentMethod,
            paymentDate: new Date(body.paymentDate),
            note: body.note,
            createdBy: body.createdBy,
        });
        return Response.json({ message: 'Order Payment added', data: orderPayments, ok: true }, { status: 201 });
    } catch (error) {
        console.error('Error creating order payment:', error);
        return new Response(JSON.stringify({ message: 'Lỗi tạo đơn hàng' }), { status: 400 });
    }
}
