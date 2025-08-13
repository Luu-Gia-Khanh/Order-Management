import { BankAccount } from '@/types/BankAccount';

export function mapJsonToBankAccount(item: Record<string, string>): BankAccount {
    return {
        id: item.id,
        accountNumber: item.accountNumber,
        bankName: item.bankName,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
    };
}
