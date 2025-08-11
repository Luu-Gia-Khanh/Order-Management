'use client';

import MetricsCard from '@/features/dashboard/components/MetricsCard';
import OrderStatusChart from '@/features/dashboard/components/OrderStatusChart';
import RecentOrders from '@/features/dashboard/components/RecentOrders';
import { useState } from 'react';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <>
            <div className='mb-6'>
                <h2 className='text-2xl font-bold text-gray-800 mb-2'>Dashboard Tổng quan</h2>
                <p className='text-gray-600'>Chào mừng bạn quay trở lại! Đây là tổng quan về hệ thống.</p>
            </div>

            {/* Metrics Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                <MetricsCard
                    title='Đơn hàng hôm nay'
                    value='24'
                    icon='shoppingCart'
                    trend='up'
                    trendValue='12% so với hôm qua'
                    color='blue'
                />
                <MetricsCard
                    title='Doanh thu'
                    value='45.2M'
                    icon='dollar'
                    trend='up'
                    trendValue='8% so với tuần trước'
                    color='green'
                />
                <MetricsCard
                    title='Đơn chờ xử lý'
                    value='7'
                    icon='clock'
                    trend='warning'
                    trendValue='Cần xử lý'
                    color='yellow'
                />
                <MetricsCard
                    title='Khách hàng'
                    value='1,234'
                    icon='users'
                    trend='up'
                    trendValue='+5 khách hàng mới'
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

            {/* Quick Actions */}
            <div className='mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4'>Thao tác nhanh</h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <button className='flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors'>
                        <span className='text-blue-600 font-medium'>Tạo đơn hàng</span>
                    </button>
                    <button className='flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors'>
                        <span className='text-green-600 font-medium'>Thêm khách hàng</span>
                    </button>
                    <button className='flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors'>
                        <span className='text-purple-600 font-medium'>Thêm sản phẩm</span>
                    </button>
                </div>
            </div>
        </>
    );
}
