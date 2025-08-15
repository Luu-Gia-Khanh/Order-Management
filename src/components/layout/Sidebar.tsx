'use client';

import { FiHome, FiShoppingBag, FiUsers, FiBox, FiCreditCard, FiTruck, FiDollarSign, FiSettings } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
        { name: 'Đơn hàng', icon: FiShoppingBag, path: '/orders' },
        { name: 'Khách hàng', icon: FiUsers, path: '/customers' },
        // { name: 'Sản phẩm', icon: FiBox, path: '/products' },
        // { name: 'Thanh toán', icon: FiCreditCard, path: '/payments' },
        // { name: 'Vận chuyển', icon: FiTruck, path: '/shipping' },
        // { name: 'Tài khoản ngân hàng', icon: FiDollarSign, path: '/bank-accounts' },
        { name: 'Cài đặt', icon: FiSettings, path: '/settings' },
    ];

    return (
        <aside className='fixed left-0 top-16 w-64 h-full bg-white shadow-lg border-r border-gray-200 z-30'>
            <nav className='p-4 space-y-2'>
                {navItems.map((item) => (
                    <Link
                        href={item.path}
                        key={item.name}
                        className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all 
                        ${
                            pathname === item.path
                                ? 'bg-blue-50 text-primary border-r-2 border-primary'
                                : 'text-gray-700 hover:bg-blue-50'
                        }`}
                    >
                        <item.icon className='w-5' />
                        <span className='ml-3 font-medium'>{item.name}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
