'use client';

import Button from '@/components/ui/Button';
import { DotsLoading } from '@/components/ui/Loading';
import CreateOrderModal from '@/features/orders/components/modal/CreateOrderModal';
import OrderFilters from '@/features/orders/components/OrderFilters';
import OrdersTable from '@/features/orders/components/OrdersTable';
import { Suspense, useState } from 'react';
import { BiSolidLayerPlus } from 'react-icons/bi';

export default function Orders() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Suspense fallback={<DotsLoading />}>
            <div className='mb-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-2xl font-bold text-gray-800 mb-2'>Quản lý Đơn hàng</h2>
                        <nav className='text-sm text-gray-600'>
                            <span>Dashboard</span> <span className='mx-2'>/</span> <span>Đơn hàng</span>
                        </nav>
                    </div>
                    <Button
                        className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors'
                        onClick={() => setIsOpen(true)}
                    >
                        <BiSolidLayerPlus className='mr-2' />
                        <span>Tạo đơn hàng</span>
                    </Button>
                </div>
            </div>

            <OrderFilters />
            <OrdersTable />
            {isOpen && (
                <CreateOrderModal isOpen={isOpen} isUpdate={false} orderInfo={null} onClose={() => setIsOpen(false)} />
            )}
        </Suspense>
    );
}
