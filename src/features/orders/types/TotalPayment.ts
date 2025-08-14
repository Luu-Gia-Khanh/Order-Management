export interface TotalPayment {
    prepayAmount: number;
    vatInvoice: boolean;
    paymentStatus: PaymentStatus;
}

export enum PaymentStatus {
    PAID = 'paid',
    UNPAID = 'unpaid',
}
