import { PaymentMethod } from '@/features/payment/types/PaymentMethod';
import { ShippingUnit } from '@/features/shipping/types/ShippingUnit';
import { Customer } from '@/features/customers/types/Customer';
import { OrderStatus } from './AdditionalOrderInfo';
import { BankAccount } from '@/types/BankAccount';
import { OrderItem } from './Orderitem';
import { Auth } from '@/features/auth/types/Auth';

export interface Order {
    id: string;
    orderCode: string;
    customerId: string;
    createdBy: string;
    updatedBy: string;
    deliveryDate: Date;
    shippingUnitId: string;
    shippingFee: number;
    paymentMethodId: string;
    paymentDays: number;
    bankAccountId: string | null;
    prepaidAmount: number;
    vatInvoice: boolean;
    note: string;
    status: OrderStatus;
    subtotal: number;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
    confirmedAt: Date | null;
    deliveredAt: Date | null;
    cancelledAt: Date | null;
}

export interface OrderFullInfo extends Order {
    customer: Customer;
    shippingUnit: ShippingUnit;
    paymentMethod: PaymentMethod;
    bankAccount: BankAccount | null;
    items: (OrderItem & { quantityInStock: number })[];
    auth: Auth;
}
