import { useAuthManager } from '@/features/auth/hook/useAuthManager';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';

export default function Header() {
    const { auth, logout } = useAuthManager();
    const router = useRouter();
    const handleLogout = useCallback(() => {
        logout();
        router.push('/login');
    }, [logout, router]);
    return (
        <header className='bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-40'>
            <div className='flex items-center justify-between px-6 py-4'>
                <div className='flex items-center space-x-4'>
                    <div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center'>
                        <FiShoppingCart className='text-white text-lg' />
                    </div>
                    <h1 className='text-xl font-bold text-gray-800'>OrderPro</h1>
                </div>
                <div className='flex items-center space-x-4'>
                    <div className='flex items-center space-x-2'>
                        <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                            <FiUser className='text-blue-600 text-sm' />
                        </div>
                        <span className='text-gray-700 font-medium'>{auth?.fullName}</span>
                    </div>
                    <button className='text-gray-500 hover:text-red-600 transition-colors' onClick={handleLogout}>
                        <FiLogOut />
                    </button>
                </div>
            </div>
        </header>
    );
}
