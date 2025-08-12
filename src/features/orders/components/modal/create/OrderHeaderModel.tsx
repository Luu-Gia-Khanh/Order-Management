import React from 'react';

const OrderHeader = ({ orderCode }: { orderCode: string }) => {
    return (
        <div className='section-card p-6 mb-6'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>TẠO ĐƠN HÀNG MỚI</h1>
                    <p className='text-gray-600'>Tạo đơn hàng mới cho khách hàng</p>
                </div>
                <div className='mt-4 md:mt-0'>
                    <div className='bg-blue-50 border border-blue-200 rounded-lg px-4 py-2'>
                        <span className='text-sm text-blue-600 font-medium'>Mã đơn hàng:</span>
                        <span className='text-lg font-bold text-blue-800 ml-2'>{orderCode}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderHeader;
