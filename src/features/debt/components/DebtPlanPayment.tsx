import React from 'react';
import { FaCalendarCheck, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function DebtPlanPayment() {
    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center mb-4'>
                <FaCalendarCheck className='text-blue-600 text-xl mr-3' />
                <h2 className='text-lg font-semibold text-gray-900'>Kế hoạch thanh toán</h2>
            </div>

            <div className='space-y-3'>
                <div className='border-l-4 border-green-500 bg-green-50 p-3 rounded-r-lg'>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-sm font-medium text-gray-900'>Đợt 1 - Trả trước</span>
                        <FaCheckCircle className='text-green-600' />
                    </div>
                    <div className='text-xs text-gray-600'>
                        <p>Ngày: 20/11/2023</p>
                        <p className='font-semibold text-green-600'>50,000,000 ₫</p>
                    </div>
                </div>

                <div className='border-l-4 border-green-500 bg-green-50 p-3 rounded-r-lg'>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-sm font-medium text-gray-900'>Đợt 2 - Giữa kỳ</span>
                        <FaCheckCircle className='text-green-600' />
                    </div>
                    <div className='text-xs text-gray-600'>
                        <p>Ngày: 05/12/2023</p>
                        <p className='font-semibold text-green-600'>50,000,000 ₫</p>
                    </div>
                </div>

                <div className='border-l-4 border-red-500 bg-red-50 p-3 rounded-r-lg'>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-sm font-medium text-gray-900'>Đợt 3 - Cuối kỳ</span>
                        <FaExclamationCircle className='text-red-600' />
                    </div>
                    <div className='text-xs text-gray-600'>
                        <p>Hạn: 15/12/2023</p>
                        <p className='font-semibold text-red-600'>100,000,000 ₫</p>
                        <p className='text-red-500 font-medium'>Quá hạn 30 ngày</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
