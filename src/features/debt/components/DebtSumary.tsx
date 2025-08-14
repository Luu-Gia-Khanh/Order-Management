import { OrderFullInfo } from '@/features/orders/types/Order';
import { formatCurrency } from '@/utils/currency.util';
import { daysBetween } from '@/utils/date.util';
import React from 'react';
import { FaCalculator } from 'react-icons/fa';

export default function DebtSumary({
    orderInfo,
    deadlinePayment,
    totalAmount,
    totalPaid,
    percentPaid,
    isOverday,
}: {
    orderInfo: OrderFullInfo | null;
    deadlinePayment: Date | null;
    totalAmount: number;
    totalPaid: number;
    percentPaid: number;
    isOverday: boolean;
}) {
    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center mb-6'>
                <FaCalculator className='text-green-600 text-xl mr-3' />
                <h2 className='text-xl font-semibold text-gray-900'>Tổng quan công nợ</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
                <div className='text-center p-4 bg-gray-50 rounded-lg'>
                    <p className='text-sm text-gray-600 mb-2'>Tổng giá trị đơn hàng</p>
                    <p className='text-2xl font-bold text-gray-900'>${formatCurrency(totalAmount)}</p>
                </div>
                <div className='text-center p-4 bg-green-50 rounded-lg'>
                    <p className='text-sm text-green-600 mb-2'>Đã thanh toán</p>
                    <p className='text-2xl font-bold text-green-600'>{formatCurrency(totalPaid)}</p>
                    <p className='text-xs text-green-500 mt-1'>{percentPaid}%</p>
                </div>
                <div className='text-center p-4 bg-red-50 rounded-lg'>
                    <p className='text-sm text-red-600 mb-2'>Còn phải trả</p>
                    <p className='text-2xl font-bold text-red-600'>{formatCurrency(totalAmount - totalPaid)}</p>
                    <p className='text-xs text-red-500 mt-1'>
                        {isOverday
                            ? `Quá hạn ${Math.abs(daysBetween(deadlinePayment ?? new Date()))} ngày`
                            : 'Chưa quá hạn còn ' +
                              Math.abs(daysBetween(deadlinePayment ?? new Date())) +
                              ' ngày để thanh toán'}
                    </p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className='mb-4'>
                <div className='flex justify-between text-sm mb-2'>
                    <span className='text-gray-600'>Tiến độ thanh toán</span>
                    <span className='text-gray-600'>
                        {percentPaid}% ({formatCurrency(totalPaid)} / {formatCurrency(totalAmount)})
                    </span>
                </div>
                <div className='h-3 rounded-full bg-gray-100 overflow-hidden'>
                    <div
                        className='h-full bg-gradient-to-r from-green-500 to-green-700 transition-all duration-300'
                        style={{ width: `${percentPaid}%` }}
                    ></div>
                </div>
            </div>

            {/* Chi tiết tài chính */}
            <div className='border-t pt-4'>
                <h3 className='font-semibold text-gray-900 mb-3'>Chi tiết tài chính</h3>
                <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Tổng tiền sản phẩm:</span>
                        <span className='font-medium'>
                            {orderInfo?.subtotal && formatCurrency(orderInfo?.subtotal)}
                        </span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Phí giao hàng:</span>
                        <span className='font-medium'>
                            {orderInfo?.shippingFee && formatCurrency(orderInfo?.shippingFee)}
                        </span>
                    </div>

                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Trả trước:</span>
                        <span className='font-medium text-green-600'>
                            {orderInfo?.prepaidAmount && formatCurrency(orderInfo?.prepaidAmount)}
                        </span>
                    </div>
                    <hr className='my-2' />
                    <div className='flex justify-between font-semibold'>
                        <span className='text-gray-900'>Tổng cộng:</span>
                        <span className='text-gray-900'>{formatCurrency(totalAmount)}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-green-600'>Đã thanh toán:</span>
                        <span className='text-green-600 font-semibold'>-{formatCurrency(totalPaid)}</span>
                    </div>
                    <div className='flex justify-between font-bold text-lg'>
                        <span className='text-red-600'>Còn phải trả:</span>
                        <span className='text-red-600'>{formatCurrency(totalAmount - totalPaid)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
