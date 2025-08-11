'use client';

import { useState } from 'react';
import Head from 'next/head';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({
    children,
    title = 'Hệ thống Quản lý Đơn hàng',
}: {
    children: React.ReactNode;
    title: string;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className='bg-gray-50 font-sans'>
            <Head>
                <title>{title}</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <div className='flex h-screen overflow-hidden'>
                {/* Sidebar */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Content area */}
                <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
                    {/* Site header */}
                    <Header />

                    {/* Main content */}
                    <main className='ml-64 mt-16 p-6'>{children}</main>
                </div>
            </div>
        </div>
    );
}
