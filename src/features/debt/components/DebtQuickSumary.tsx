import { OrderPayment } from '@/features/order-payment/types/OrderPayment';
import { formatDate } from '@/utils/date.util';
import React, { useMemo } from 'react';
import { FaChartBar } from 'react-icons/fa';

export default function DebtQuickSumary({
    orverDay,
    orderPayments,
    percentPaid,
}: {
    orverDay: number;
    orderPayments: OrderPayment[];
    percentPaid: number;
}) {
    const lastPayment = useMemo(() => {
        if (orderPayments.length === 0) return '../../..';
        const lastPaymentDate = orderPayments[orderPayments.length - 1].createdAt;
        return formatDate(lastPaymentDate);
    }, [orderPayments]);
    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center mb-4'>
                <FaChartBar className='text-purple-600 text-xl mr-3' />
                <h2 className='text-lg font-semibold text-gray-900'>Thống kê</h2>
            </div>

            <div className='space-y-3 text-sm'>
                <div className='flex justify-between'>
                    <span className='text-gray-600'>Số ngày quá hạn:</span>
                    <span className='font-bold text-red-600'>{orverDay > 0 ? 0 : Math.abs(orverDay)} ngày</span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-gray-600'>Số lần nhắc nở:</span>
                    <span className='font-semibold text-gray-900'>3 lần</span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-gray-600'>Lần thanh toán cuối:</span>
                    <span className='font-semibold text-gray-900'>{lastPayment}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-gray-600'>Tỷ lệ thanh toán:</span>
                    <span className='font-semibold text-yellow-600'>{percentPaid}%</span>
                </div>
            </div>
        </div>
    );
}
