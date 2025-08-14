import { Customer } from '@/features/customers/types/Customer';
import React from 'react';
import { FaAddressBook, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function DebtContact({ customerInfor }: { customerInfor: Customer | null }) {
    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center mb-4'>
                <FaAddressBook className='text-green-600 text-xl mr-3' />
                <h2 className='text-lg font-semibold text-gray-900'>Thông tin liên hệ</h2>
            </div>

            <div className='space-y-3'>
                <div className='flex items-center p-3 bg-blue-50 rounded-lg'>
                    <FaPhone className='text-blue-600 mr-3' />
                    <div>
                        <p className='font-medium text-gray-900'>{customerInfor?.phone || 'Chưa có thông tin'}</p>
                        <p className='text-xs text-gray-600'>Số điện thoại chính</p>
                    </div>
                </div>
                <div className='flex items-start p-3 bg-yellow-50 rounded-lg'>
                    <FaMapMarkerAlt className='text-yellow-600 mr-3 mt-1' />
                    <div>
                        <p className='text-xs text-gray-600'>{customerInfor?.address || 'Chưa có thông tin'}</p>
                    </div>
                </div>
            </div>

            <div className='mt-4 space-y-2 no-print'>
                <button className='w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-medium text-sm hover:translate-y-[-1px] hover:shadow-lg transition-all'>
                    <FaPhone className='mr-2 inline' />
                    Gọi điện
                </button>
                {/* <button className='w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-2 rounded-lg font-medium text-sm hover:translate-y-[-1px] hover:shadow-lg transition-all'>
                    <FaEnvelope className='mr-2 inline' />
                    Gửi email
                </button> */}
            </div>
        </div>
    );
}
