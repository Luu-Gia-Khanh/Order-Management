import { PaymentMethod } from '../types/PaymentMethod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapJsonToPaymentMethod(json: Record<string, any>): PaymentMethod {
    return {
        id: json.id,
        code: json.code,
        name: json.name,
        description: json.description,
        requiresBankInfo: json.requiresBankInfo,
        requiresPaymentDays: json.requiresPaymentDays,
        status: json.status,
        createdAt: json.createdAt ? new Date(json.createdAt) : undefined,
        updatedAt: json.updatedAt ? new Date(json.updatedAt) : undefined,
    };
}
