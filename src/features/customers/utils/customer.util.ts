import { Customer } from '../types/Customer';

export function mapJsonToCustomer(item: Record<string, string>): Customer {
    return {
        id: item.id,
        name: item.name,
        phone: item.phone,
        address: item.address,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
    };
}
