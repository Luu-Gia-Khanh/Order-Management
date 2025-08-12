import paymentDb from '../../../../public/data/payment.json';
import { PaymentMethod } from '../types/PaymentMethod';
import { mapJsonToPaymentMethod } from '../utils/payment.util';

export const paymentRepository = {
    async fetchAllPaymentMethods(): Promise<PaymentMethod[]> {
        return paymentDb.map(mapJsonToPaymentMethod);
    },
};
