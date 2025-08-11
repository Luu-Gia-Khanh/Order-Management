import CustomerTable from '@/features/customers/components/CustomerTable';
import React from 'react';

export default function CustomersPage() {
    return (
        <>
            <div className='mb-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-2xl font-bold text-gray-800 mb-2'>Quản lý khách hàng</h2>
                        <nav className='text-sm text-gray-600'>
                            <span>Dashboard</span> <span className='mx-2'>/</span> <span>Khách hàng</span>
                        </nav>
                    </div>
                    ``
                    <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors'>
                        <span>Thêm khách hàng mới</span>
                    </button>
                </div>
            </div>
            <CustomerTable />
        </>
    );
}
