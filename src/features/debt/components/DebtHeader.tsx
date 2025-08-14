import Button from '@/components/ui/Button';
import React from 'react';
import { FaArrowLeft, FaBell, FaPlus, FaPrint } from 'react-icons/fa';

export default function DebtHeader({ isDone, onAddPayment }: { isDone: boolean; onAddPayment: () => void }) {
    const goBack = () => {
        window.history.back();
    };
    return (
        <div className='bg-white p-6 mb-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                <div className='flex items-center mb-4 lg:mb-0'>
                    <button
                        onClick={goBack}
                        className='no-print mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors'
                    >
                        <FaArrowLeft className='text-xl' />
                    </button>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900'>Chi Tiết Công Nợ Đơn Hàng</h1>
                        <p className='text-gray-600 mt-1'>Thông tin chi tiết công nợ và lịch sử thanh toán</p>
                    </div>
                </div>
                <div className='flex flex-wrap gap-3 no-print'>
                    <button className='bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:translate-y-[-1px] hover:shadow-lg transition-all'>
                        <FaPrint className='mr-2 inline' />
                        In phiếu công nợ
                    </button>
                    {!isDone && (
                        <>
                            <button className='bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-4 py-2 rounded-lg font-medium hover:translate-y-[-1px] hover:shadow-lg transition-all'>
                                <FaBell className='mr-2 inline' />
                                Gửi nhắc nở
                            </button>
                            <Button
                                className='bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-lg font-medium hover:translate-y-[-1px] hover:shadow-lg transition-all'
                                onClick={onAddPayment}
                            >
                                <FaPlus className='mr-2 inline' />
                                Thêm thanh toán
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
