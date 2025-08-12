export interface AdditionalOrderInfo {
    notes?: string;
    orderStatus: OrderStatus;
}

export enum OrderStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    REPAIRED = 'repaired',
    SHIPPING = 'shipping',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}
