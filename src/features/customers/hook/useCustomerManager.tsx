import { useAppStore } from '@/stores';
import { useCallback } from 'react';
import { Customer } from '../types/Customer';

export function useCustomerManager() {
    const customer = useAppStore((state) => state.customer);
    const fetchCustomers = useAppStore((state) => state.fetchCustomers);
    const createCustomer = useAppStore((state) => state.createCustomer);

    const { loading, error, customers } = customer;

    const handleCreateCustomer = useCallback(
        ({ name, phone, address }: { name: string; phone: string; address: string }) => {
            const newCustomer: Customer = {
                id: Date.now().toString(),
                name,
                phone,
                address,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            createCustomer(newCustomer);
        },
        [createCustomer]
    );

    return {
        loading,
        error,
        customers,

        fetchCustomers,
        handleCreateCustomer,
    };
}
