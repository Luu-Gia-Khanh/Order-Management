export interface PaymentMethod {
    id: string;
    code: string;
    name: string;
    description?: string;
    requiresBankInfo?: boolean;
    requiresPaymentDays?: boolean;
    status?: 'active' | 'inactive';
    createdAt?: Date;
    updatedAt?: Date;
}
