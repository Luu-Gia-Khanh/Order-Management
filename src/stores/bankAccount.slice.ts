import { StateCreator } from 'zustand';
import { BankAccount } from '@/types/BankAccount';
import { bankAccountRepository } from '@/features/bank-account/repository/bankAccount.repository';

export interface BankAccountState {
    bank: {
        banks: BankAccount[];
        loading: boolean;
        error: string | null;
    };

    fetchBankAccounts: () => void;
}

export const createBankAccountSlice: StateCreator<BankAccountState> = (set) => ({
    bank: {
        banks: [],
        loading: false,
        error: null,
    },

    fetchBankAccounts: async () => {
        set((state) => ({ bank: { ...state.bank, loading: true, error: null } }));
        try {
            const data = await bankAccountRepository.fetchAllBankAccounts();
            set((state) => ({ bank: { ...state.bank, banks: data, loading: false, error: null } }));
        } catch (error) {
            set((state) => ({ bank: { ...state.bank, loading: false, error: (error as Error).message } }));
        }
    },
});
