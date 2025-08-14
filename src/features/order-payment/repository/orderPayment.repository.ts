import { OrderPayment } from '../types/OrderPayment';

export const orderPaymentRepository = {
    async fetchAllOrderPayment(): Promise<OrderPayment[]> {
        const data = await fetch('/api/order/payment')
            .then((response) => response.json())
            .then((data) => {
                return data as OrderPayment[];
            });

        return data ?? [];
    },
    async addOrderPayment({
        orderId,
        paymentAmount,
        paymentMethod,
        paymentDate,
        note,
        createdBy,
    }: {
        orderId: string;
        paymentAmount: number;
        paymentMethod: string;
        paymentDate: Date;
        note: string;
        createdBy: string;
    }): Promise<OrderPayment | null> {
        const data = await fetch('/api/order/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId: orderId,
                paymentAmount: paymentAmount,
                paymentMethod: paymentMethod,
                paymentDate: paymentDate,
                note: note,
                createdBy: createdBy,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                return data.data as OrderPayment;
            })
            .catch(() => null);

        return data ?? null;
    },
};
