'use client';

import { DotsLoading } from '@/components/ui/Loading';
import { useCustomerManager } from '@/features/customers/hook/useCustomerManager';
import MetricsCard from '@/features/dashboard/components/MetricsCard';
import OrderStatusChart from '@/features/dashboard/components/OrderStatusChart';
import RecentOrders from '@/features/dashboard/components/RecentOrders';
import { useOrderManager } from '@/features/orders/hook/useOrderManager';
import { formatCurrency } from '@/utils/currency.util';
import { Suspense } from 'react';

export default function Dashboard() {
    const { ordersToday, orders, inProcessOrders, totalRevenue, totalRevenueToday } = useOrderManager();
    const { customers, customerToday } = useCustomerManager();
    return (
        <Suspense fallback={<DotsLoading />}>
            <div className='mb-6'>
                <h2 className='text-2xl font-bold text-gray-800 mb-2'>Dashboard Tổng quan</h2>
                <p className='text-gray-600'>Chào mừng bạn quay trở lại! Đây là tổng quan về hệ thống.</p>
            </div>

            {/* Metrics Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                <MetricsCard
                    title='Đơn hàng hôm nay'
                    value={ordersToday.length.toString()}
                    icon='shoppingCart'
                    trend={'up'}
                    trendValue={`Tổng số lượng đơn: ${orders.length}`}
                    color='green'
                />
                <MetricsCard
                    title='Doanh thu hôm nay'
                    value={formatCurrency(totalRevenueToday)}
                    icon='dollar'
                    trend='neutral'
                    trendValue={`Tổng doanh thu: ${formatCurrency(totalRevenue)}`}
                    color='blue'
                />
                <MetricsCard
                    title='Đơn chờ xử lý'
                    value={inProcessOrders.length.toString()}
                    icon='clock'
                    trend='warning'
                    trendValue='Cần xử lý'
                    color='yellow'
                />
                <MetricsCard
                    title='Khách hàng hôm nay'
                    value={customerToday.length.toString()}
                    icon='users'
                    trend='neutral'
                    trendValue={`Tổng số khách hàng: ${customers.length}`}
                    color='purple'
                />
            </div>

            {/* Charts and Recent Orders */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                <div className='lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
                    <RecentOrders />
                </div>
                <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
                    <OrderStatusChart />
                </div>
            </div>
        </Suspense>
    );
}
