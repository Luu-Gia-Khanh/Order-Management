import paymentDb from '../../../../public/data/payment.json';
import { PaymentMethod } from '../types/PaymentMethod';
import { mapJsonToPaymentMethod } from '../utils/payment.util';

export const paymentRepository = {
    async fetchAllPaymentMethods(): Promise<PaymentMethod[]> {
        return paymentDb.map(mapJsonToPaymentMethod);
    },

    getPaymentById(paymentMethodId: string): PaymentMethod | null {
        const paymentMethod = paymentDb.find((payment) => payment.id === paymentMethodId);
        if (!paymentMethod) {
            return null;
        }
        return mapJsonToPaymentMethod(paymentMethod);
    },
};
