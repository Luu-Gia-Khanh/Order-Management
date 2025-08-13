import { useAppStore } from '@/stores';

export function useBankAccountManager() {
    const bank = useAppStore((state) => state.bank);
    const fetchBankAccounts = useAppStore((state) => state.fetchBankAccounts);

    const { loading, error, banks } = bank;

    return {
        loading,
        error,
        banks,
        fetchBankAccounts,
    };
}
