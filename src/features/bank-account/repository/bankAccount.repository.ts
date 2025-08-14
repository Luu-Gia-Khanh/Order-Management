import { BankAccount } from '@/types/BankAccount';

export const bankAccountRepository = {
    async fetchAllBankAccounts(): Promise<BankAccount[]> {
        const data = await fetch('/api/bank-account')
            .then((response) => response.json())
            .then((data) => {
                return data as BankAccount[];
            });

        return data ?? [];
    },
};
