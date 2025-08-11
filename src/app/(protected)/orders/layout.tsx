import Layout from '@/components/layout/Layout';
import React from 'react';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <Layout title='Quản lý Đơn hàng'>{children}</Layout>;
}
