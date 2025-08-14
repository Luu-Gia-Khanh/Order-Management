import { OrderFullInfo } from '@/features/orders/types/Order';
import { daysBetween, formatDate } from '@/utils/date.util';
import React from 'react';
import { FaReceipt } from 'react-icons/fa';

export default function DebtOrderInfor({
    orderInfo,
    deadlinePayment,
}: {
    orderInfo: OrderFullInfo | null;
    deadlinePayment: Date | null;
}) {
    const isOverday = daysBetween(deadlinePayment ?? new Date()) < 0;
    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center mb-6'>
                <FaReceipt className='text-blue-600 text-xl mr-3' />
                <h2 className='text-xl font-semibold text-gray-900'>Thông tin đơn hàng</h2>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {/* Order Info */}
                <div className='space-y-4'>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Mã đơn hàng:</span>
                        <span className='font-semibold text-blue-600'>{orderInfo?.id}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Ngày tạo:</span>
                        <span className='font-semibold text-gray-900'>
                            {orderInfo?.createdAt && formatDate(orderInfo?.createdAt)}
                        </span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Hạn thanh toán:</span>
                        <span className='font-semibold text-red-600'>
                            {deadlinePayment && formatDate(deadlinePayment)}
                        </span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Số ngày trả:</span>
                        <span className='font-semibold text-gray-900'>{orderInfo?.paymentDays} ngày</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Trạng thái:</span>
                        <span
                            className={`${
                                isOverday ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            } px-2 py-1 rounded-full text-xs font-medium`}
                        >
                            {isOverday
                                ? `Quá hạn ${Math.abs(daysBetween(deadlinePayment ?? new Date()))} ngày`
                                : 'Chưa quá hạn còn ' + Math.abs(daysBetween(deadlinePayment ?? new Date())) + ' ngày'}
                        </span>
                    </div>
                </div>

                {/* Customer Info */}
                <div className='space-y-4'>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Khách hàng:</span>
                        <span className='font-semibold text-gray-900'>{orderInfo?.customer?.name}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Số điện thoại:</span>
                        <span className='font-semibold text-gray-900'>{orderInfo?.customer?.phone}</span>
                    </div>

                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Địa chỉ:</span>
                        <span className='font-semibold text-gray-900 text-right'>{orderInfo?.customer?.address}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Người phụ trách:</span>
                        <span className='font-semibold text-gray-900'>{orderInfo?.auth.fullName}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
