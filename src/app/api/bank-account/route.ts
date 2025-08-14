import path from 'path';
import fs from 'fs';
import { BankAccount } from '@/types/BankAccount';

const filePath = path.join(process.cwd(), 'public/data/bank_accounts.json');

export async function GET() {
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const bankAccounts: BankAccount[] = JSON.parse(raw);
        return Response.json(bankAccounts);
    } catch {
        return new Response(JSON.stringify({ message: 'Lỗi đọc file' }), { status: 500 });
    }
}
