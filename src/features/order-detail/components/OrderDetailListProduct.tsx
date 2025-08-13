import { OrderFullInfo } from '@/features/orders/types/Order';
import { formatCurrency } from '@/utils/currency.util';
import React, { useMemo } from 'react';
import { FaBox, FaImage } from 'react-icons/fa';

export default function OrderDetailListProduct({ orderFullInfor }: { orderFullInfor: OrderFullInfo | null }) {
    const orderItems = useMemo(() => {
        return orderFullInfor?.items || [];
    }, [orderFullInfor]);
    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center mb-6'>
                <FaBox className='text-orange-600 text-xl mr-3' />
                <h2 className='text-xl font-semibold text-gray-900'>Danh sách sản phẩm</h2>
            </div>

            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead>
                        <tr className='border-b border-gray-200'>
                            <th className='text-left py-3 text-sm font-medium text-gray-700'>Sản phẩm</th>
                            <th className='text-right py-3 text-sm font-medium text-gray-700'>Đơn giá</th>
                            <th className='text-center py-3 text-sm font-medium text-gray-700'>Số lượng</th>
                            <th className='text-right py-3 text-sm font-medium text-gray-700'>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                        {orderItems.map((item) => {
                            return (
                                <tr key={item.id} className='hover:bg-gray-50 transition-colors'>
                                    <td className='py-4'>
                                        <div className='flex items-center'>
                                            <div className='w-15 h-15 bg-gray-100 rounded-lg mr-4 flex items-center justify-center'>
                                                <FaImage className='text-gray-400' />
                                            </div>
                                            <div>
                                                <p className='font-medium text-gray-900'>{item.productName}</p>
                                                <p className='text-sm text-gray-500'>Kho: {item.quantityInStock}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-4 text-right font-medium'>{formatCurrency(item.price)}</td>
                                    <td className='py-4 text-center'>{item.quantity}</td>
                                    <td className='py-4 text-right font-bold text-gray-900'>
                                        {formatCurrency(item.price * item.quantity)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
