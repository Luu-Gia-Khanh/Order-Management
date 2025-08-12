export interface ShippingUnit {
    id: string;
    name: string;
    contactPhone: string;
    description: string;
    baseFee: number;
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
}
