import { customerRepository } from '@/features/customers/repository/customer.repository';
import { Customer } from './../features/customers/types/Customer';
import { StateCreator } from 'zustand';

export interface CustomerState {
    customer: {
        customers: Customer[];
        loading: boolean;
        error: string | null;
    };

    fetchCustomers: () => void;
    createCustomer: (customer: Customer) => Promise<void>;
}

export const createCustomerSlice: StateCreator<CustomerState> = (set, get) => ({
    customer: {
        customers: [],
        loading: false,
        error: null,
    },

    fetchCustomers: async () => {
        set((state) => ({ customer: { ...state.customer, loading: true, error: null } }));
        try {
            const data = await customerRepository.fetchAllCustomer();
            data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            set((state) => ({ customer: { ...state.customer, customers: data, loading: false, error: null } }));
        } catch (error) {
            set((state) => ({ customer: { ...state.customer, loading: false, error: (error as Error).message } }));
        }
    },
    createCustomer: async (customer: Customer) => {
        set((state) => ({ customer: { ...state.customer, loading: true, error: null } }));
        try {
            const newCustomer = await customerRepository.createCustomer(customer);
            const newCustomers = [newCustomer, ...get().customer.customers];
            set((state) => ({
                customer: {
                    ...state.customer,
                    customers: newCustomers,
                    loading: false,
                    error: null,
                },
            }));
        } catch (error) {
            set((state) => ({ customer: { ...state.customer, loading: false, error: (error as Error).message } }));
        }
    },
});
