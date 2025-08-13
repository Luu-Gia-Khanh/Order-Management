import { OrderFullInfo } from '@/features/orders/types/Order';
import React from 'react';
import { FaUser } from 'react-icons/fa';

export default function OrderDetailInforCustomer({ orderFullInfor }: { orderFullInfor: OrderFullInfo | null }) {
    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center mb-4'>
                <FaUser className='text-green-600 text-xl mr-3' />
                <h2 className='text-xl font-semibold text-gray-900'>Thông tin khách hàng</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-3'>
                    <div>
                        <span className='text-gray-600 text-sm'>Tên khách hàng</span>
                        <p className='font-semibold text-gray-900'>{orderFullInfor?.customer?.name}</p>
                    </div>
                    <div>
                        <span className='text-gray-600 text-sm'>Số điện thoại</span>
                        <p className='font-semibold text-gray-900'>{orderFullInfor?.customer?.phone}</p>
                    </div>
                </div>
                <div>
                    <span className='text-gray-600 text-sm'>Địa chỉ giao hàng</span>
                    <p className='font-semibold text-gray-900'>
                        {orderFullInfor?.customer?.address || 'Chưa có địa chỉ'}
                    </p>
                </div>
            </div>
        </div>
    );
}
