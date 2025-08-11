'use client';

import CreateOrderModal from '@/features/orders/components/CreateOrderModal';
import OrderFilters from '@/features/orders/components/OrderFilters';
import OrdersTable from '@/features/orders/components/OrdersTable';
import { useState } from 'react';

export default function Orders() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className='mb-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-2xl font-bold text-gray-800 mb-2'>Quản lý Đơn hàng</h2>
                        <nav className='text-sm text-gray-600'>
                            <span>Dashboard</span> <span className='mx-2'>/</span> <span>Đơn hàng</span>
                        </nav>
                    </div>
                    <button
                        className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors'
                        onClick={() => setIsOpen(true)}
                    >
                        <span>Tạo đơn hàng</span>
                    </button>
                </div>
            </div>

            <OrderFilters />
            <OrdersTable />
            <CreateOrderModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
