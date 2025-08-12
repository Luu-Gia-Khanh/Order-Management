import { ShippingUnit } from '../types/ShippingUnit';

export function mapJsonToShipping(item: Record<string, string>): ShippingUnit {
    return {
        id: item.id,
        name: item.name,
        contactPhone: item.contactPhone,
        description: item.description,
        baseFee: parseFloat(item.baseFee),
        status: item.status as 'active' | 'inactive',
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
    };
}
