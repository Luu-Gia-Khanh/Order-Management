import path from 'path';
import fs from 'fs';
import { Product } from '@/features/products/types/Product';

const filePath = path.join(process.cwd(), 'public/data/products.json');

export async function GET() {
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const products: Product[] = JSON.parse(raw);
        return Response.json(products);
    } catch {
        return new Response(JSON.stringify({ message: 'Lỗi đọc file' }), { status: 500 });
    }
}
