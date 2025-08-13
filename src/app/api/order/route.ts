import path from 'path';
import fs from 'fs';
import { Order } from '@/features/orders/types/Order';
import { Customer } from '@/features/customers/types/Customer';
import { paymentRepository } from '@/features/payment/repository/payment.repository';
import { PaymentMethodType } from '@/features/payment/types/PaymentMethod';
import { BankAccount } from '@/types/BankAccount';
import { OrderStatus } from '@/features/orders/types/AdditionalOrderInfo';
import { OrderItem } from '@/features/orders/types/Orderitem';
import { OrderStatusHistory } from '@/features/order-status-history/types/OrderStatusHistory';

const filePath = path.join(process.cwd(), 'public/data/orders.json');

export async function GET() {
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const orders: Order[] = JSON.parse(raw);
        return Response.json(orders);
    } catch {
        return new Response(JSON.stringify({ message: 'Lỗi đọc file' }), { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const orders: Order[] = JSON.parse(raw);

        // process data from request
        const body = await req.json();

        const newOrder = await handleGenerateOrder(body);
        if (!newOrder) {
            return new Response(JSON.stringify({ message: 'Lỗi tạo đơn hàng' }), { status: 400 });
        }

        const existingOrder = orders.find((order) => order.orderCode === newOrder.orderCode);
        if (existingOrder) {
            const index = orders.findIndex((order) => order.id === existingOrder.id);
            if (index !== -1) {
                orders[index] = newOrder;
            }
        } else {
            orders.push(newOrder);
            // Add new order to history
            addStatusHistory({
                orderCode: newOrder.id,
                authId: newOrder.createdBy,
                status: newOrder.status,
            });
        }

        // create order items
        const productOrders = body.productOrders || [];
        console.log('productOrders', productOrders);
        const orderItems = [];
        for (const product of productOrders) {
            const orderItem = await handleGenerateOrderItem({
                orderId: newOrder.id,
                productId: product.id,
                productName: product.name,
                price: product.price,
                quantity: product.quantity,
                note: product.note || '',
            });
            if (orderItem) {
                orderItems.push(orderItem);
            } else {
                console.error('Failed to create order item for product:', product);
            }
        }

        fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), 'utf-8');

        return Response.json(
            { message: 'Order added', data: { order: newOrder, orderItem: orderItems }, ok: true },
            { status: 201 }
        );
    } catch {
        return new Response(JSON.stringify({ message: 'Lỗi ghi file' }), { status: 500 });
    }
}

async function handleGenerateOrderItem({
    orderId,
    productId,
    productName,
    price,
    quantity,
    note,
}: {
    orderId: string;
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    note: string;
}): Promise<OrderItem | null> {
    try {
        const filePath = path.join(process.cwd(), 'public/data/order_items.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        const orderItems: OrderItem[] = JSON.parse(raw);
        const existingItem = orderItems.find((item) => item.orderId === orderId && item.productId === productId);
        let id = Date.now().toString();
        if (existingItem) {
            id = existingItem.id; // Use existing item ID if it exists
        } else {
            id = Date.now().toString();
        }
        // Update existing item
        const newItem: OrderItem = {
            id: id,
            orderId,
            productId,
            productName,
            price,
            quantity,
            subtotal: price * quantity,
            note,
            createdAt: new Date(),
        };
        if (existingItem) {
            const index = orderItems.findIndex((item) => item.id === existingItem.id);
            if (index !== -1) {
                orderItems[index] = newItem; // Update existing item
            }
        } else {
            orderItems.push(newItem);
        }
        fs.writeFileSync(filePath, JSON.stringify(orderItems, null, 2), 'utf-8');
        return newItem;
    } catch (error) {
        console.error('Error generating order item:', error);
        return null;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleGenerateOrder(body: any): Promise<Order | null> {
    try {
        const orderCode = body.orderCode;
        // customer
        let customerId = null;
        const isNewCustomer = body.isNewCustomer;
        if (isNewCustomer) {
            const customer = await addCustomer({
                name: body.customerInfo.name,
                phone: body.customerInfo.phone,
                address: body.customerInfo.address,
            });
            customerId = customer?.id || null;
        } else {
            customerId = body.customerInfo.id;
        }

        // auth create
        const auth = body.auth.id;

        // deliveryDate
        const deliveryDate = new Date(body.deliveryInfo.deliveryDate);

        // shippingUnitId
        const shippingUnitId = body.deliveryInfo.shippingUnitId;

        //shippingFee
        const shippingFee = body.shippingFee;

        // paymentMethodId
        const paymentMethodId = body.paymentInfo.id;
        const payment = await paymentRepository.getPaymentById(paymentMethodId);
        let paymentDays = body.paymentInfo.paymentDays || 0;
        let bankAccountId = null;
        switch (payment?.code) {
            case PaymentMethodType.BANK_TRANSFER:
                const bankAccount = await addBankAccount({
                    accountNumber: body.paymentInfo.accountNumber,
                    bankName: body.paymentInfo.bankName,
                });
                bankAccountId = bankAccount?.id || null;
                break;
            case PaymentMethodType.INSTALLMENT:
                paymentDays = body.paymentInfo.paymentDays || 0;
            default:
                break;
        }

        // prepaidAmount
        const prepaidAmount = body.totalPayment.prepayAmount || 0;

        // vatInvoice
        const vatInvoice = body.totalPayment.vatInvoice || false;

        // note
        const note = body.additionalInfo.notes || '';

        // status
        const status = body.additionalInfo.orderStatus || OrderStatus.PENDING;

        // subtotal
        const subtotal = body.subTotal || 0;

        // totalAmount
        const totalAmount = subtotal + shippingFee - prepaidAmount;

        // createdAt
        const createdAt = new Date();
        // updatedAt
        const updatedAt = new Date();
        // confirmedAt
        const confirmedAt = status === OrderStatus.CONFIRMED ? new Date() : null;
        // deliveredAt
        const deliveredAt = status === OrderStatus.DELIVERED ? new Date() : null;
        // cancelledAt
        const cancelledAt = status === OrderStatus.CANCELLED ? new Date() : null;

        console.log('payment', payment);

        const newOrder: Order = {
            id: orderCode,
            orderCode,
            customerId,
            createdBy: auth,
            updatedBy: auth,
            deliveryDate,
            shippingUnitId,
            shippingFee,
            paymentMethodId,
            paymentDays,
            bankAccountId,
            prepaidAmount,
            vatInvoice,
            note,
            status,
            subtotal,
            totalAmount,
            createdAt,
            updatedAt,
            confirmedAt,
            deliveredAt,
            cancelledAt,
        };

        return newOrder;
    } catch (error) {
        console.error('Error generating order:', error);
        return null;
    }
}

async function addBankAccount({
    accountNumber,
    bankName,
}: {
    accountNumber: string;
    bankName: string;
}): Promise<BankAccount | null> {
    try {
        const filePath = path.join(process.cwd(), 'public/data/bank_accounts.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        const bankAccounts: BankAccount[] = JSON.parse(raw);

        const newBankAccount: BankAccount = {
            id: Date.now().toString(),
            accountNumber,
            bankName,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        bankAccounts.push(newBankAccount);
        fs.writeFileSync(filePath, JSON.stringify(bankAccounts, null, 2), 'utf-8');
        return newBankAccount;
    } catch (error) {
        console.error('Error adding bank account:', error);
        return null;
    }
}
async function addStatusHistory({
    orderCode,
    authId,
    status,
}: {
    orderCode: string;
    authId: string;
    status: OrderStatus;
}) {
    try {
        const filePath = path.join(process.cwd(), 'public/data/order_status_history.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        const statusHistory: OrderStatusHistory[] = JSON.parse(raw);

        const newStatus: OrderStatusHistory = {
            id: Date.now().toString(),
            orderId: orderCode,
            fromStatus: null,
            toStatus: status,
            changedByAdminId: authId,
            note: '',
            changedAt: new Date(),
        };

        statusHistory.push(newStatus);
        fs.writeFileSync(filePath, JSON.stringify(statusHistory, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error adding status history:', error);
    }
}
async function addCustomer({
    name,
    phone,
    address,
}: {
    name: string;
    phone: string;
    address: string;
}): Promise<Customer | null> {
    try {
        const filePath = path.join(process.cwd(), 'public/data/customers.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        const customers: Customer[] = JSON.parse(raw);

        const newCustomer: Customer = {
            id: Date.now().toString(),
            name,
            phone,
            address,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        console.log('newCustomer', newCustomer);

        customers.push(newCustomer);

        fs.writeFileSync(filePath, JSON.stringify(customers, null, 2), 'utf-8');

        return newCustomer;
    } catch {
        console.log('ERROR ADD CUSTOMER');

        return null;
    }
}
