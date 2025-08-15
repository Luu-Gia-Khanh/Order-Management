import { useAppStore } from '@/stores';
import { useCallback, useMemo } from 'react';
import { OrderFullInfo } from '../types/Order';
import { OrderStatus } from '../types/AdditionalOrderInfo';

export function useOrderManager() {
    const order = useAppStore((state) => state.order);
    const createOrder = useAppStore((state) => state.createOrder);
    const fetchOrders = useAppStore((state) => state.fetchOrders);
    const deleteOrder = useAppStore((state) => state.deleteOrder);
    const updateOrderStatus = useAppStore((state) => state.updateOrderStatus);
    const updateOrderPaymentStatus = useAppStore((state) => state.updateOrderPaymentStatus);

    const customers = useAppStore((state) => state.customer.customers);
    const shippings = useAppStore((state) => state.shipping.shippings);
    const payments = useAppStore((state) => state.payment.payments);
    const bankAccounts = useAppStore((state) => state.bank.banks);
    const orderItems = useAppStore((state) => state.orderItem.orderItems);
    const auths = useAppStore((state) => state.auths);
    const products = useAppStore((state) => state.product.products);

    const { loading, error, orders } = order;

    const ordersFullInfo: OrderFullInfo[] = useMemo(() => {
        const data = orders.map((order) => {
            const customer = customers.find((c) => c.id === order.customerId);
            const shippingUnit = shippings.find((s) => s.id === order.shippingUnitId);
            const paymentMethod = payments.find((p) => p.id === order.paymentMethodId);
            const bankAccount = bankAccounts?.find((b) => b.id === order.bankAccountId);
            const orderItemsByOrder = orderItems
                ?.filter((item) => item.orderId === order.id)
                .map((item) => {
                    return {
                        ...item,
                        quantityInStock: products.find((p) => p.id === item.productId)?.stockQuantity || 0,
                    };
                });
            const auth = auths.find((a) => a.id === order.createdBy);
            return {
                ...order,
                customer: customer!,
                shippingUnit: shippingUnit!,
                paymentMethod: paymentMethod!,
                bankAccount: bankAccount! ?? null,
                items: orderItemsByOrder!,
                auth: auth!,
            };
        });
        data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return data;
    }, [auths, bankAccounts, customers, orderItems, orders, payments, products, shippings]);

    const ordersFullInfoById = useCallback(
        (orderId: string) => {
            return ordersFullInfo.find((order) => order.id === orderId);
        },
        [ordersFullInfo]
    );

    const ordersToday = useMemo(() => {
        const today = new Date();
        return orders.filter((order) => {
            const orderDate = new Date(order.createdAt);
            return (
                orderDate.getDate() === today.getDate() &&
                orderDate.getMonth() === today.getMonth() &&
                orderDate.getFullYear() === today.getFullYear()
            );
        });
    }, [orders]);

    const orderYesterday = useMemo(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return orders.filter((order) => {
            const orderDate = new Date(order.createdAt);
            return (
                orderDate.getDate() === yesterday.getDate() &&
                orderDate.getMonth() === yesterday.getMonth() &&
                orderDate.getFullYear() === yesterday.getFullYear()
            );
        });
    }, [orders]);

    const percentageWithYesterday: number = useMemo(() => {
        if (ordersToday.length === 0 || orderYesterday.length === 0) return 0;
        const yesterdayCount = orderYesterday.length;
        const todayCount = ordersToday.length;
        const percentage = ((todayCount - yesterdayCount) / yesterdayCount) * 100;
        return parseFloat(percentage.toFixed(2));
    }, [ordersToday.length, orderYesterday.length]);

    const inProcessOrders = useMemo(() => {
        return orders.filter((order) => order.status === OrderStatus.PENDING);
    }, [orders]);

    const totalRevenue = useMemo(() => {
        return orders.reduce((acc, order) => {
            return acc + order.subtotal;
        }, 0);
    }, [orders]);

    const totalRevenueToday = useMemo(() => {
        return ordersToday.reduce((acc, order) => {
            return acc + order.subtotal;
        }, 0);
    }, [ordersToday]);

    const recentOrders = useMemo(() => {
        return ordersFullInfo.slice(0, 3);
    }, [ordersFullInfo]);

    return {
        loading,
        error,
        orders,
        ordersFullInfo,
        ordersToday,
        orderYesterday,
        percentageWithYesterday,
        inProcessOrders,
        totalRevenue,
        totalRevenueToday,
        recentOrders,
        createOrder,
        fetchOrders,
        deleteOrder,
        ordersFullInfoById,
        updateOrderStatus,
        updateOrderPaymentStatus,
    };
}
