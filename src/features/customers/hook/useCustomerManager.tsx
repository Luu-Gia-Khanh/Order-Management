import { useAppStore } from '@/stores';
import { useCallback, useMemo } from 'react';
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

    const customerToday = useMemo(() => {
        return customers.filter((customer) => {
            const createdAt = new Date(customer.createdAt);
            const today = new Date();
            return (
                createdAt.getDate() === today.getDate() &&
                createdAt.getMonth() === today.getMonth() &&
                createdAt.getFullYear() === today.getFullYear()
            );
        });
    }, [customers]);

    return {
        loading,
        error,
        customers,
        customerToday,

        fetchCustomers,
        handleCreateCustomer,
    };
}
