import { OrderFullInfo } from '@/features/orders/types/Order';
import { formatCurrency } from '@/utils/currency.util';
import React from 'react';
import { FaMapMarkerAlt, FaShippingFast } from 'react-icons/fa';

export default function OrderDetailDeliveryInfor({ orderFullInfor }: { orderFullInfor: OrderFullInfo | null }) {
    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center mb-4'>
                <FaShippingFast className='text-orange-600 text-xl mr-3' />
                <h2 className='text-xl font-semibold text-gray-900'>Thông tin vận chuyển</h2>
            </div>

            <div className='space-y-3'>
                <div>
                    <span className='text-gray-600 text-sm'>Mã vận đơn</span>
                    <p className='font-semibold text-gray-900'>{orderFullInfor?.id}</p>
                </div>
                <div>
                    <span className='text-gray-600 text-sm'>Đơn vị vận chuyển</span>
                    <p className='font-semibold text-gray-900'>{orderFullInfor?.shippingUnit?.name}</p>
                </div>
                <div>
                    <span className='text-gray-600 text-sm'>Phí vận chuyển</span>
                    <p className='font-semibold text-gray-900'>{formatCurrency(orderFullInfor?.shippingFee || 0)}</p>
                </div>
                <div>
                    <span className='text-gray-600 text-sm'>Thời gian dự kiến</span>
                    <p className='font-semibold text-gray-900'>1-2 ngày</p>
                </div>
                <button
                    onClick={() => {}}
                    className='w-full mt-4 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-lg font-medium transition-colors hover:translate-y-[-1px]'
                >
                    <FaMapMarkerAlt className='mr-2 inline' />
                    Theo dõi đơn hàng
                </button>
            </div>
        </div>
    );
}
