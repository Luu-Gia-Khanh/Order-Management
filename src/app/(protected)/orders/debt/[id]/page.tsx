'use client';
import DebtContact from '@/features/debt/components/DebtContact';
import DebtHeader from '@/features/debt/components/DebtHeader';
import DebtHistoryPayment from '@/features/debt/components/DebtHistoryPayment';
import DebtOrderInfor from '@/features/debt/components/DebtOrderInfor';
import DebtPaymentModal from '@/features/debt/components/DebtPaymentModal';
import DebtQuickSumary from '@/features/debt/components/DebtQuickSumary';
import DebtRemindHistory from '@/features/debt/components/DebtRemindHistory';
import DebtSumary from '@/features/debt/components/DebtSumary';
import { useOrderPaymentManager } from '@/features/order-payment/hook/useOrderPaymentManager';
import { useOrderManager } from '@/features/orders/hook/useOrderManager';
import { PaymentStatus } from '@/features/orders/types/TotalPayment';
import { addDays, daysBetween } from '@/utils/date.util';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

const DebtDetail = () => {
    const { ordersFullInfoById, updateOrderPaymentStatus } = useOrderManager();
    const { orderPayments } = useOrderPaymentManager();
    const params = useParams();
    const id = params.id;

    const [isOpen, setOpen] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);

    const orderFullInfor = useMemo(() => {
        return orderId ? ordersFullInfoById(orderId) ?? null : null;
    }, [orderId, ordersFullInfoById]);

    const deadlinePayment = useMemo(() => {
        return addDays(orderFullInfor?.createdAt ?? new Date(), orderFullInfor?.paymentDays ?? 0);
    }, [orderFullInfor?.createdAt, orderFullInfor?.paymentDays]);

    const orderPaymentsByOrderId = useMemo(() => {
        if (!orderId) {
            return [];
        }
        return orderPayments.filter((payment) => payment.orderId === orderId);
    }, [orderId, orderPayments]);

    // Calculate order
    const totalPaid = useMemo(() => {
        return orderPaymentsByOrderId.reduce((total, payment) => total + payment.paymentAmount, 0);
    }, [orderPaymentsByOrderId]);

    const percentPaid = useMemo(() => {
        if (!orderFullInfor || orderFullInfor.totalAmount === 0) return 0;
        return parseFloat(((totalPaid / orderFullInfor.totalAmount) * 100).toFixed(1));
    }, [orderFullInfor, totalPaid]);

    const isOverday = useMemo(() => {
        return daysBetween(deadlinePayment ?? new Date()) < 0;
    }, [deadlinePayment]);

    const isDone = useMemo(() => {
        return percentPaid === 100;
    }, [percentPaid]);

    useEffect(() => {
        if (!id) {
            return;
        }
        const orderId = Array.isArray(id) ? id[0] : id;
        setOrderId(orderId);
    }, [id, orderFullInfor, ordersFullInfoById]);

    useEffect(() => {
        if (isDone) {
            updateOrderPaymentStatus(orderId ?? '', PaymentStatus.PAID);
        }
    }, [isDone, orderId, updateOrderPaymentStatus]);

    return (
        <div className='bg-gray-50 min-h-screen py-6'>
            <div className='max-w-6xl mx-auto px-4'>
                {/* Header */}
                <DebtHeader isDone={isDone} onAddPayment={() => setOpen(true)} />

                <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
                    {/* Main Content */}
                    <div className='xl:col-span-2 space-y-6'>
                        {/* Thông tin đơn hàng và khách hàng */}
                        <DebtOrderInfor orderInfo={orderFullInfor} deadlinePayment={deadlinePayment} />

                        {/* Tổng quan công nợ */}
                        <DebtSumary
                            orderInfo={orderFullInfor}
                            deadlinePayment={deadlinePayment}
                            totalAmount={orderFullInfor?.totalAmount ?? 0}
                            totalPaid={totalPaid}
                            percentPaid={percentPaid}
                            isOverday={isOverday}
                        />

                        {/* Lịch sử thanh toán */}
                        <DebtHistoryPayment
                            isDone={isDone}
                            orderInfo={orderFullInfor}
                            orderPayments={orderPaymentsByOrderId}
                            deadlinePayment={deadlinePayment}
                            onAddPayment={() => setOpen(true)}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className='space-y-6'>
                        {/* Kế hoạch thanh toán */}
                        {/* <DebtPlanPayment /> */}

                        {/* Thông tin liên hệ */}
                        <DebtContact customerInfor={orderFullInfor?.customer ?? null} />

                        {/* Lịch sử nhắc nở */}
                        <DebtRemindHistory />

                        {/* Thống kê nhanh */}
                        <DebtQuickSumary
                            percentPaid={percentPaid}
                            orverDay={daysBetween(deadlinePayment ?? new Date())}
                            orderPayments={orderPaymentsByOrderId}
                        />
                    </div>
                </div>
            </div>

            {/* Modal thêm thanh toán */}
            {isOpen && (
                <DebtPaymentModal
                    orderId={orderFullInfor?.id ?? ''}
                    needPaid={(orderFullInfor?.totalAmount ?? 0) - totalPaid}
                    setShowPaymentModal={setOpen}
                />
            )}
        </div>
    );
};

export default DebtDetail;
