import { BankAccount } from '@/types/BankAccount';
import bankAccountDb from '../../../../public/data/bank_accounts.json';
import { mapJsonToBankAccount } from '../utils/bankAccount.utils';

export const bankAccountRepository = {
    async fetchAllBankAccounts(): Promise<BankAccount[]> {
        return bankAccountDb.map(mapJsonToBankAccount);
    },
};
