import { OrderFullInfo } from '@/features/orders/types/Order';
import { formatCurrency } from '@/utils/currency.util';
import React from 'react';
import { FaCalculator } from 'react-icons/fa';

export default function OrderDetailSumaryPayment({ orderFullInfor }: { orderFullInfor: OrderFullInfo | null }) {
    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center mb-4'>
                <FaCalculator className='text-purple-600 text-xl mr-3' />
                <h2 className='text-xl font-semibold text-gray-900'>Tổng kết thanh toán</h2>
            </div>

            <div className='space-y-3'>
                <div className='flex justify-between'>
                    <span className='text-gray-600'>Tổng tiền sản phẩm:</span>
                    <span className='font-semibold'>{formatCurrency(orderFullInfor?.subtotal || 0)}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-gray-600'>Phí giao hàng:</span>
                    <span className='font-semibold'>{formatCurrency(orderFullInfor?.shippingFee || 0)}</span>
                </div>

                <div className='flex justify-between'>
                    <span className='text-gray-600'>Số tiền trả trước:</span>
                    <span className='font-semibold text-green-600'>
                        -{formatCurrency(orderFullInfor?.prepaidAmount || 0)}
                    </span>
                </div>
                <hr className='border-gray-200' />
                <div className='flex justify-between items-center'>
                    <span className='text-xl font-bold text-gray-900'>Tổng thanh toán:</span>
                    <span className='text-2xl font-bold text-blue-600'>
                        {formatCurrency(orderFullInfor?.totalAmount || 0)}
                    </span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-gray-600'>Còn phải thu:</span>
                    <span className='text-lg font-bold text-red-600'>
                        {formatCurrency(orderFullInfor?.totalAmount || 0)}
                    </span>
                </div>
            </div>
        </div>
    );
}
