import { OrderFullInfo } from '@/features/orders/types/Order';
import { formatDate } from '@/utils/date.util';
import { mapingOrderStatus, statusColors } from '@/utils/status.util';
import React from 'react';
import { FaReceipt } from 'react-icons/fa';

export default function OrderDetailInforOrder({ orderFullInfor }: { orderFullInfor: OrderFullInfo | null }) {
    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center'>
                    <FaReceipt className='text-blue-600 text-xl mr-3' />
                    <h2 className='text-xl font-semibold text-gray-900'>Thông tin đơn hàng</h2>
                </div>
                <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide ${
                        orderFullInfor?.status && statusColors(orderFullInfor?.status)
                    }`}
                >
                    {orderFullInfor?.status && mapingOrderStatus(orderFullInfor?.status)}
                </span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Mã đơn hàng:</span>
                        <span className='font-semibold text-gray-900'>{orderFullInfor?.id}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Ngày tạo:</span>
                        <span className='font-semibold text-gray-900'>
                            {orderFullInfor?.createdAt && formatDate(orderFullInfor?.createdAt, 'dd/MM/yyyy HH:mm')}
                        </span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Ngày giao hàng:</span>
                        <span className='font-semibold text-gray-900'>
                            {orderFullInfor?.deliveryDate && formatDate(orderFullInfor?.deliveryDate)}
                        </span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Đơn vị vận chuyển:</span>
                        <span className='font-semibold text-gray-900'>{orderFullInfor?.shippingUnit?.name}</span>
                    </div>
                </div>
                <div className='space-y-4'>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Hình thức thanh toán:</span>
                        <span className='font-semibold text-gray-900'>{orderFullInfor?.paymentMethod?.name}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Trạng thái thanh toán:</span>
                        <span className='font-semibold text-yellow-600'>Chưa thanh toán</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Nhân viên tạo:</span>
                        <span className='font-semibold text-gray-900'>{orderFullInfor?.auth?.fullName}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Ghi chú:</span>
                        <span className='font-semibold text-gray-900'>{orderFullInfor?.note}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
