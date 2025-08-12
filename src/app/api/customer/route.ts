import path from 'path';
import fs from 'fs';
import { Customer } from '@/features/customers/types/Customer';

const filePath = path.join(process.cwd(), 'public/data/customers.json');

export async function GET() {
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const customers: Customer[] = JSON.parse(raw);
        return Response.json(customers);
    } catch {
        return new Response(JSON.stringify({ message: 'Lỗi đọc file' }), { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const customers: Customer[] = JSON.parse(raw);

        const body = await req.json();

        const newCustomer: Customer = {
            ...body,
        };

        customers.push(newCustomer);

        fs.writeFileSync(filePath, JSON.stringify(customers, null, 2), 'utf-8');

        return Response.json({ message: 'Customer added', customer: newCustomer, ok: true }, { status: 201 });
    } catch {
        return new Response(JSON.stringify({ message: 'Lỗi ghi file' }), { status: 500 });
    }
}
