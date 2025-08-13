import { useOrderStatusHistoryManager } from '@/features/order-status-history/hook/useOrderStatusHistoryManager';
import { OrderStatus } from '@/features/orders/types/AdditionalOrderInfo';
import { OrderFullInfo } from '@/features/orders/types/Order';
import { formatDate } from '@/utils/date.util';
import { mapingOrderStatus } from '@/utils/status.util';
import React, { useMemo } from 'react';
import { FaCheck, FaCircle, FaClock, FaTruck } from 'react-icons/fa';

export default function OrderDetailOrderStatus({ orderFullInfor }: { orderFullInfor: OrderFullInfo | null }) {
    const { orderStatusHistories } = useOrderStatusHistoryManager();

    const histories = useMemo(() => {
        if (!orderFullInfor) return [];
        return orderStatusHistories.filter((history) => history.orderId === orderFullInfor.id);
    }, [orderFullInfor, orderStatusHistories]);
    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center mb-4'>
                <FaTruck className='text-blue-600 text-xl mr-3' />
                <h2 className='text-xl font-semibold text-gray-900'>Trạng thái đơn hàng</h2>
            </div>

            <div className='space-y-4'>
                <div className='relative pl-8'>
                    <div className='flex justify-between items-start'>
                        <div>
                            <p className='font-medium text-gray-900'>Đơn hàng đã được tạo</p>
                            <p className='text-sm text-gray-500'>
                                {orderFullInfor?.createdAt && formatDate(orderFullInfor?.createdAt, 'dd/MM/yyyy HH:mm')}
                            </p>
                        </div>
                        <FaCheck className='text-green-600 mt-1' />
                    </div>
                    <div className='absolute left-2 top-2 w-3 h-3 rounded-full bg-green-500'></div>
                    <div className='absolute left-[11px] top-5 w-0.5 h-full bg-gray-200'></div>
                </div>

                {/* LOOP  */}
                {histories.map((history, index) => {
                    const isDoneStatus =
                        history.toStatus === OrderStatus.DELIVERED ||
                        history.toStatus === OrderStatus.CANCELLED ||
                        index < histories.length - 1;
                    return (
                        <div key={history.id} className='relative pl-8'>
                            <div className='flex justify-between items-start'>
                                <div>
                                    <p className='font-medium text-gray-900'>{mapingOrderStatus(history.toStatus)}</p>
                                    <p className='text-sm text-gray-500'>
                                        {formatDate(history.changedAt, 'dd/MM/yyyy HH:mm')}
                                    </p>
                                </div>
                                {isDoneStatus ? (
                                    <FaCheck className='text-green-600 mt-1' />
                                ) : (
                                    <FaClock className='text-blue-600 mt-1' />
                                )}
                            </div>
                            <div
                                className={`absolute left-2 top-2 w-3 h-3 rounded-full ${
                                    isDoneStatus ? 'bg-green-500' : 'bg-blue-500'
                                }`}
                            ></div>
                            <div className='absolute left-[11px] top-5 w-0.5 h-full bg-gray-200'></div>
                        </div>
                    );
                })}

                {/* <div className='relative pl-8'>
                    <div className='flex justify-between items-start'>
                        <div>
                            <p className='font-medium text-blue-600'>Đang chuẩn bị hàng</p>
                            <p className='text-sm text-gray-500'>16/01/2024 09:00</p>
                        </div>
                        <FaClock className='text-blue-600 mt-1' />
                    </div>
                    <div className='absolute left-2 top-2 w-3 h-3 rounded-full bg-blue-500'></div>
                    <div className='absolute left-[11px] top-5 w-0.5 h-full bg-gray-200'></div>
                </div>
                <div className='relative pl-8'>
                    <div className='flex justify-between items-start'>
                        <div>
                            <p className='font-medium text-gray-400'>Đang giao hàng</p>
                            <p className='text-sm text-gray-400'>Dự kiến: 17/01/2024</p>
                        </div>
                        <FaCircle className='text-gray-300 mt-1' />
                    </div>
                    <div className='absolute left-2 top-2 w-3 h-3 rounded-full bg-gray-300'></div>
                    <div className='absolute left-[11px] top-5 w-0.5 h-full bg-gray-200'></div>
                </div>
                <div className='relative pl-8'>
                    <div className='flex justify-between items-start'>
                        <div>
                            <p className='font-medium text-gray-400'>Đã giao hàng</p>
                            <p className='text-sm text-gray-400'>Chưa hoàn thành</p>
                        </div>
                        <FaCircle className='text-gray-300 mt-1' />
                    </div>
                    <div className='absolute left-2 top-2 w-3 h-3 rounded-full bg-gray-300'></div>
                </div> */}
            </div>
        </div>
    );
}
