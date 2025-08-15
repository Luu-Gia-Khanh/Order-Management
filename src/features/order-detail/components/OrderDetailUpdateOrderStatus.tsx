import Button from '@/components/ui/Button';
import OrderStatusSelect from '@/components/ui/status/OrderStatusSelect';
import { useAuthManager } from '@/features/auth/hook/useAuthManager';
import { useOrderStatusHistoryManager } from '@/features/order-status-history/hook/useOrderStatusHistoryManager';
import { useOrderManager } from '@/features/orders/hook/useOrderManager';
import { OrderStatus } from '@/features/orders/types/AdditionalOrderInfo';
import { OrderFullInfo } from '@/features/orders/types/Order';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';

export default function OrderDetailUpdateOrderStatus({ orderFullInfor }: { orderFullInfor: OrderFullInfo | null }) {
    const { updateOrderStatus } = useOrderManager();
    const { fetchAllOrderStatusHistory } = useOrderStatusHistoryManager();

    const { auth } = useAuthManager();
    const [status, setStatus] = useState(OrderStatus.PENDING);
    const [note, setNote] = useState('');

    useEffect(() => {
        setStatus(orderFullInfor?.status || OrderStatus.PENDING);
    }, [orderFullInfor?.status]);
    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 no-print'>
            <div className='flex items-center mb-4'>
                <FaEdit className='text-green-600 text-xl mr-3' />
                <h2 className='text-xl font-semibold text-gray-900'>Cập nhật trạng thái</h2>
            </div>

            <div className='space-y-4'>
                <OrderStatusSelect statusValue={status} onStatusChange={setStatus} />
                <textarea
                    value={note}
                    placeholder='Ghi chú cập nhật...'
                    className='w-full p-3 border border-gray-300 rounded-lg h-20 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    onChange={(e) => setNote(e.target.value)}
                ></textarea>
                <Button
                    onClick={() => {
                        updateOrderStatus(
                            orderFullInfor?.id ?? '',
                            orderFullInfor?.status ?? OrderStatus.PENDING,
                            status,
                            note,
                            auth?.id ?? ''
                        ).then(() => {
                            fetchAllOrderStatusHistory();
                        });
                    }}
                    className='bg-gradient-to-r from-green-500 to-green-700 w-full text-white py-3 rounded-lg font-medium hover:translate-y-[-1px] hover:shadow-lg transition-all'
                >
                    <FaSave className='mr-2 inline' />
                    Cập nhật trạng thái
                </Button>
            </div>
        </div>
    );
}
