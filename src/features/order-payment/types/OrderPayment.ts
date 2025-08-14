export interface OrderPayment {
    id: string;
    orderId: string;
    paymentAmount: number;
    paymentMethod: string;
    paymentDate: Date;
    note?: string;
    createdBy: string;
    createdAt: Date;
}
