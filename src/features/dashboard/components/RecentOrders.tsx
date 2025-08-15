import { useOrderManager } from '@/features/orders/hook/useOrderManager';
import { formatCurrency } from '@/utils/currency.util';
import { formatDate } from '@/utils/date.util';
import { mapingOrderStatus, statusColors } from '@/utils/status.util';

export default function RecentOrders() {
    const { recentOrders } = useOrderManager();

    return (
        <div>
            <div className='flex items-center justify-between mb-6'>
                <h3 className='text-lg font-semibold text-gray-800'>Đơn hàng gần đây</h3>
                <button className='text-blue-600 hover:text-blue-700 text-sm font-medium'>Xem tất cả</button>
            </div>
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead>
                        <tr className='border-b border-gray-100'>
                            <th className='text-left py-3 text-gray-600 font-medium text-sm'>Mã đơn</th>
                            <th className='text-left py-3 text-gray-600 font-medium text-sm'>Khách hàng</th>
                            <th className='text-left py-3 text-gray-600 font-medium text-sm'>Ngày</th>
                            <th className='text-left py-3 text-gray-600 font-medium text-sm'>Trạng thái</th>
                            <th className='text-right py-3 text-gray-600 font-medium text-sm'>Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order.id} className='border-b border-gray-50'>
                                <td className='py-4 text-sm font-medium text-gray-800'>#{order.id}</td>
                                <td className='py-4 text-sm text-gray-600'>{order.customer.name}</td>
                                <td className='py-4 text-sm text-gray-600'>{formatDate(order.createdAt)}</td>
                                <td className='py-4'>
                                    <span className={`px-2 py-1 ${statusColors(order.status)} text-xs rounded-full`}>
                                        {mapingOrderStatus(order.status)}
                                    </span>
                                </td>
                                <td className='py-4 text-sm font-medium text-gray-800 text-right'>
                                    {formatCurrency(order.totalAmount)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
