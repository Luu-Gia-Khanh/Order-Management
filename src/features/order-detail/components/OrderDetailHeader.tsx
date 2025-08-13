import React from 'react';
import { FaArrowLeft, FaEdit, FaPrint, FaTimes } from 'react-icons/fa';

export default function OrderDetailHeader() {
    return (
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
            <div className='flex items-center mb-4 lg:mb-0'>
                <button
                    onClick={() => window.history.back()}
                    className='no-print mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors'
                >
                    <FaArrowLeft className='text-xl' />
                </button>
                <div>
                    <h1 className='text-3xl font-bold text-gray-900'>Chi Tiết Đơn Hàng</h1>
                    <p className='text-gray-600 mt-1'>Thông tin chi tiết và trạng thái đơn hàng</p>
                </div>
            </div>
            <div className='flex flex-wrap gap-3 no-print'>
                <button
                    onClick={() => {}}
                    className='bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:translate-y-[-1px] hover:shadow-lg transition-all'
                >
                    <FaPrint className='mr-2 inline' /> In đơn hàng
                </button>
                <button
                    onClick={() => {}}
                    className='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors hover:translate-y-[-1px]'
                >
                    <FaEdit className='mr-2 inline' /> Chỉnh sửa
                </button>
                <button
                    onClick={() => {}}
                    className='bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-lg font-medium hover:translate-y-[-1px] hover:shadow-lg transition-all'
                >
                    <FaTimes className='mr-2 inline' /> Hủy đơn
                </button>
            </div>
        </div>
    );
}
