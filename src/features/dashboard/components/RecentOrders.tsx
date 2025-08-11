export default function RecentOrders() {
    const orders = [
        {
            id: 'DH001',
            customer: 'Nguyễn Văn A',
            date: '15/12/2024',
            status: 'Hoàn thành',
            statusColor: 'bg-green-100 text-green-800',
            amount: '2,500,000đ',
        },
        {
            id: 'DH002',
            customer: 'Trần Thị B',
            date: '15/12/2024',
            status: 'Đang xử lý',
            statusColor: 'bg-yellow-100 text-yellow-800',
            amount: '1,800,000đ',
        },
        {
            id: 'DH003',
            customer: 'Lê Văn C',
            date: '14/12/2024',
            status: 'Đang giao',
            statusColor: 'bg-blue-100 text-blue-800',
            amount: '3,200,000đ',
        },
    ];

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
                        {orders.map((order) => (
                            <tr key={order.id} className='border-b border-gray-50'>
                                <td className='py-4 text-sm font-medium text-gray-800'>#{order.id}</td>
                                <td className='py-4 text-sm text-gray-600'>{order.customer}</td>
                                <td className='py-4 text-sm text-gray-600'>{order.date}</td>
                                <td className='py-4'>
                                    <span className={`px-2 py-1 ${order.statusColor} text-xs rounded-full`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className='py-4 text-sm font-medium text-gray-800 text-right'>{order.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
