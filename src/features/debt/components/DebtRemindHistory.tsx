import React from 'react';
import { FaBell } from 'react-icons/fa';

export default function DebtRemindHistory() {
    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center mb-4'>
                <FaBell className='text-orange-600 text-xl mr-3' />
                <h2 className='text-lg font-semibold text-gray-900'>Lịch sử nhắc nở</h2>
            </div>

            <div className='space-y-3'>
                <div className='border-l-4 border-yellow-400 bg-yellow-50 p-3 rounded-r-lg'>
                    <div className='flex justify-between items-start mb-2'>
                        <p className='font-medium text-gray-900 text-sm'>SMS nhắc nở</p>
                        <span className='text-xs text-gray-500'>14/01/2024</span>
                    </div>
                    <p className='text-xs text-gray-600'>Gửi tin nhắn nhắc thanh toán đơn hàng quá hạn</p>
                </div>

                <div className='border-l-4 border-blue-400 bg-blue-50 p-3 rounded-r-lg'>
                    <div className='flex justify-between items-start mb-2'>
                        <p className='font-medium text-gray-900 text-sm'>Gọi điện</p>
                        <span className='text-xs text-gray-500'>07/01/2024</span>
                    </div>
                    <p className='text-xs text-gray-600'>Liên hệ trực tiếp, khách hàng cam kết thanh toán</p>
                </div>

                <div className='border-l-4 border-green-400 bg-green-50 p-3 rounded-r-lg'>
                    <div className='flex justify-between items-start mb-2'>
                        <p className='font-medium text-gray-900 text-sm'>Email nhắc nở</p>
                        <span className='text-xs text-gray-500'>01/01/2024</span>
                    </div>
                    <p className='text-xs text-gray-600'>Gửi email thông báo sắp đến hạn thanh toán</p>
                </div>
            </div>
        </div>
    );
}
