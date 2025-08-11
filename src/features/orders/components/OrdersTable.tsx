export default function OrdersTable() {
    const orders = [
        {
            id: 'DH001',
            customer: 'Nguyễn Văn A',
            phone: '0123456789',
            date: '15/12/2024',
            status: 'Hoàn thành',
            statusColor: 'bg-green-100 text-green-800',
            admin: 'Admin Nguyễn',
            amount: '2,500,000đ',
        },
        {
            id: 'DH002',
            customer: 'Trần Thị B',
            phone: '0987654321',
            date: '16/12/2024',
            status: 'Đang xử lý',
            statusColor: 'bg-yellow-100 text-yellow-800',
            admin: 'Admin Trần',
            amount: '1,800,000đ',
        },
    ];

    return (
        <div className='bg-white rounded-xl shadow-sm border border-gray-100'>
            <div className='p-6 border-b border-gray-100'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-semibold text-gray-800'>Danh sách đơn hàng</h3>
                    <div className='flex items-center space-x-2'>
                        <button className='text-gray-600 hover:text-gray-800 px-3 py-1 rounded text-sm'>
                            <span>Xuất Excel</span>
                        </button>
                        <button className='text-red-600 hover:text-red-700 px-3 py-1 rounded text-sm'>
                            <span>Xóa đã chọn</span>
                        </button>
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
                        {orders.map((order) => (
                            <tr key={order.id} className='hover:bg-gray-50'>
                                <td className='px-6 py-4'>
                                    <input type='checkbox' className='rounded border-gray-300' />
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm font-medium text-gray-900'>#{order.id}</div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='text-sm text-gray-900'>{order.customer}</div>
                                    <div className='text-sm text-gray-500'>{order.phone}</div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{order.date}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.statusColor}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{order.admin}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium'>
                                    {order.amount}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                                    <div className='flex items-center justify-center space-x-2'>
                                        <button className='text-blue-600 hover:text-blue-900' title='Xem chi tiết'>
                                            <span>Xem</span>
                                        </button>
                                        <button className='text-green-600 hover:text-green-900' title='Chỉnh sửa'>
                                            <span>Sửa</span>
                                        </button>
                                        <button className='text-purple-600 hover:text-purple-900' title='Nhân bản'>
                                            <span>Nhân bản</span>
                                        </button>
                                        <button className='text-red-600 hover:text-red-900' title='Xóa'>
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
        </div>
    );
}
