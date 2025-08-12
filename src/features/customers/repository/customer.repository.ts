import { Customer } from '../types/Customer';

export const customerRepository = {
    async fetchAllCustomer(): Promise<Customer[]> {
        const data = await fetch('/api/customer')
            .then((response) => response.json())
            .then((data) => {
                return data as Customer[];
            });

        return data ?? [];
    },

    async createCustomer(customer: Customer): Promise<Customer> {
        try {
            const response = await fetch('/api/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer),
            }).then((res) => res.json());

            if (!response.ok) {
                throw new Error('Failed to create customer');
            }
            return response.customer as Customer;
        } catch (error) {
            console.error('Error creating customer:', error);
            throw new Error((error as Error).message || 'Failed to create customer');
        }
    },
};
