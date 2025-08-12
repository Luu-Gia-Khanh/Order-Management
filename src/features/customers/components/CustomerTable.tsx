'use client';

import { Customer } from '../types/Customer';

export default function CustomerTable({ customers }: { customers: Customer[] }) {
    const columns = [
        {
            key: 'id',
            name: 'Mã khách hàng',
        },
        {
            key: 'name',
            name: 'Tên khách hàng',
        },
        {
            key: 'phone',
            name: 'Số điện thoại',
        },
        {
            key: 'address',
            name: 'Địa chỉ',
        },
        // {
        //     key: 'actions',
        //     name: '',
        // },
    ];

    return (
        <div className='bg-white rounded-xl shadow-sm border border-gray-100'>
            <div className='p-6 border-b border-gray-100'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-semibold text-gray-800'>Danh sách khách hàng</h3>
                    {/* <div className='flex items-center space-x-2'>
                        <button className='text-gray-600 hover:text-gray-800 px-3 py-1 rounded text-sm'>
                            <span>Xuất Excel</span>
                        </button>
                        <button className='text-red-600 hover:text-red-700 px-3 py-1 rounded text-sm'>
                            <span>Xóa đã chọn</span>
                        </button>
                    </div> */}
                </div>
            </div>
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead className='bg-gray-50'>
                        <tr>
                            {columns.map((column) => {
                                return (
                                    <th
                                        key={column.key}
                                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                        {column.name}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {customers.map((row) => (
                            <tr key={row.id} className='hover:bg-gray-50'>
                                {columns.map((column) => {
                                    if (column.key === 'actions') {
                                        return (
                                            <td
                                                key={column.key}
                                                className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'
                                            >
                                                <div className='flex items-center justify-center space-x-2'>
                                                    <button
                                                        className='text-blue-600 hover:text-blue-900'
                                                        title='Xem chi tiết'
                                                    >
                                                        <span>Xem</span>
                                                    </button>
                                                    <button
                                                        className='text-green-600 hover:text-green-900'
                                                        title='Chỉnh sửa'
                                                    >
                                                        <span>Sửa</span>
                                                    </button>
                                                    <button
                                                        className='text-purple-600 hover:text-purple-900'
                                                        title='Nhân bản'
                                                    >
                                                        <span>Nhân bản</span>
                                                    </button>
                                                    <button className='text-red-600 hover:text-red-900' title='Xóa'>
                                                        <span>Xóa</span>
                                                    </button>
                                                </div>
                                            </td>
                                        );
                                    } else {
                                        const value = row[column.key as keyof typeof row];
                                        return (
                                            <td
                                                key={column.key}
                                                className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'
                                            >
                                                {value instanceof Date
                                                    ? value.toLocaleDateString() // hoặc toISOString(), format bạn muốn
                                                    : value || ''}
                                            </td>
                                        );
                                    }
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <div className='px-6 py-3 border-t border-gray-200 flex items-center justify-between'>
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
            </div> */}
        </div>
    );
}
