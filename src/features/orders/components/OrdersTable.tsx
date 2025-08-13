'use client';
import { formatCurrency } from '@/utils/currency.util';
import { useOrderManager } from '../hook/useOrderManager';
import { formatDate } from '@/utils/date.util';
import { useState } from 'react';
import CreateOrderModal from './modal/CreateOrderModal';
import { OrderFullInfo } from '../types/Order';
import DeleteModal from '@/components/ui/modal/DeleteModal';
import { useRouter } from 'next/navigation';
import { mapingOrderStatus, statusColors } from '@/utils/status.util';

export default function OrdersTable() {
    const router = useRouter();
    const { ordersFullInfo, deleteOrder } = useOrderManager();
    const [isOpen, setIsOpen] = useState(false);
    const [isShowDelete, setIsShowDelete] = useState(false);
    const [activeOrder, setActiveOrder] = useState<OrderFullInfo | null>(null);

    if (ordersFullInfo.length === 0) {
        return (
            <div className='section-card p-6 text-center'>
                <h2 className='text-xl font-semibold text-gray-900'>Không có đơn hàng nào</h2>
                <p className='text-gray-600'></p>
            </div>
        );
    }
    return (
        <div className='bg-white rounded-xl shadow-sm border border-gray-100'>
            <div className='p-6 border-b border-gray-100'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-semibold text-gray-800'>Danh sách đơn hàng</h3>
                    <div className='flex items-center space-x-2'>
                        {/* <button className='text-gray-600 hover:text-gray-800 px-3 py-1 rounded text-sm'>
                            <span>Xuất Excel</span>
                        </button>
                        <button className='text-red-600 hover:text-red-700 px-3 py-1 rounded text-sm'>
                            <span>Xóa đã chọn</span>
                        </button> */}
                    </div>
                </div>
            </div>
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-3 text-left'>
                                <input type='checkbox' className='rounded border-gray-300' />
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Mã đơn hàng
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Khách hàng
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Ngày giao
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Trạng thái
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Admin tạo
                            </th>
                            <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Tổng tiền
                            </th>
                            <th className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {ordersFullInfo.map((order) => (
                            <tr key={order.id} className='hover:bg-gray-50'>
                                <td className='px-6 py-4'>
                                    <input type='checkbox' className='rounded border-gray-300' />
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm font-medium text-gray-900'>
                                        <span className='bg-blue-50 p-1 rounded'>#{order.id}</span>
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>{order.customer?.name}</div>
                                    <div className='text-sm text-gray-500'>{order.customer?.phone}</div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                    {formatDate(order.deliveryDate)}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors(
                                            order.status
                                        )}`}
                                    >
                                        {mapingOrderStatus(order.status)}
                                    </span>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                    {order.auth?.fullName}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium'>
                                    {formatCurrency(order.totalAmount)}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                                    <div className='flex items-center justify-center space-x-2'>
                                        <button
                                            className='text-blue-600 hover:text-blue-900 cursor-pointer'
                                            title='Xem chi tiết'
                                            onClick={() => router.push(`/orders/${order.id}`)}
                                        >
                                            <span>Xem</span>
                                        </button>
                                        <button
                                            className='text-green-600 hover:text-green-900 cursor-pointer'
                                            title='Chỉnh sửa'
                                            onClick={() => {
                                                setActiveOrder(order);
                                                setIsOpen(true);
                                            }}
                                        >
                                            <span>Sửa</span>
                                        </button>
                                        <button
                                            className='text-red-600 hover:text-red-900 cursor-pointer'
                                            title='Xóa'
                                            onClick={() => {
                                                setActiveOrder(order);
                                                setIsShowDelete(true);
                                            }}
                                        >
                                            <span>Xóa</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='px-6 py-3 border-t border-gray-200 flex items-center justify-between'>
                <div className='text-sm text-gray-700'>
                    Hiển thị <span className='font-medium'>1</span> đến <span className='font-medium'>10</span> của{' '}
                    <span className='font-medium'>97</span> kết quả
                </div>
                <div className='flex items-center space-x-2'>
                    <button className='px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50'>Trước</button>
                    <button className='px-3 py-1 bg-blue-600 text-white rounded text-sm'>1</button>
                    <button className='px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50'>2</button>
                    <button className='px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50'>3</button>
                    <button className='px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50'>Sau</button>
                </div>
            </div>
            {isOpen && (
                <CreateOrderModal
                    isOpen={isOpen}
                    isUpdate={true}
                    orderInfo={activeOrder}
                    onClose={() => setIsOpen(false)}
                />
            )}
            {isShowDelete && (
                <DeleteModal
                    isOpen={isShowDelete}
                    onClose={() => setIsShowDelete(false)}
                    onDelete={() => {
                        if (activeOrder) {
                            deleteOrder(activeOrder.id);
                        }
                        setIsShowDelete(false);
                    }}
                />
            )}
        </div>
    );
}
