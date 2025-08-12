export interface PaymentOrderInfo {
    id: string; // payment method ID
    paymentDays?: number | null; // number of days for payment
    bankName?: string;
    accountNumber?: string;
}
