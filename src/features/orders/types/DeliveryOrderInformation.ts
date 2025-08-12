export interface DeliveryOrderInformation {
    deliveryDate: Date | null;
    deliveredAt: Date | null;
    cancelledAt: Date | null;
    shippingUnitId: string | null;
}
