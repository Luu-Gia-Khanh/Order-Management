import { OrderStatus } from '@/features/orders/types/AdditionalOrderInfo';

export interface OrderStatusHistory {
    id: string;
    orderId: string;
    fromStatus: OrderStatus | null;
    toStatus: OrderStatus;
    changedByAdminId: string;
    note: string;
    changedAt: Date;
}
