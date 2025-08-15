'use client';

import { Customer } from '@/features/customers/types/Customer';
import { formatDate } from '@/utils/date.util';
import { useMemo } from 'react';

type CustomerSearchTableProps = {
    searchValue?: string;
    customers: Customer[];
    onSelectCustomer: (customer: Customer) => void;
};
export default function CustomerSearchTable({ searchValue, customers, onSelectCustomer }: CustomerSearchTableProps) {
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
    ];

    const filteredCustomers = useMemo(() => {
        console.log('Filtering customers with search value:', searchValue);
        if (!searchValue) return customers;
        return customers.filter(
            (customer) =>
                customer.name.toLowerCase().includes(searchValue.toLowerCase()) || customer.phone.includes(searchValue)
        );
    }, [searchValue, customers]);

    if (filteredCustomers.length === 0) {
        return (
            <div className='p-6 text-center text-gray-500'>
                <p>Không tìm thấy khách hàng nào</p>
            </div>
        );
    }

    return (
        <div className='bg-white rounded-xl shadow-sm border border-gray-100'>
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
                        {filteredCustomers.map((row) => (
                            <tr
                                key={row.id}
                                className='hover:bg-gray-50 cursor-pointer'
                                onClick={() => onSelectCustomer(row)}
                            >
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
                                                    ? formatDate(value) // hoặc toISOStr
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
        </div>
    );
}
