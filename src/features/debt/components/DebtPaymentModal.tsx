import Button from '@/components/ui/Button';
import { useAuthManager } from '@/features/auth/hook/useAuthManager';
import { useOrderPaymentManager } from '@/features/order-payment/hook/useOrderPaymentManager';
import { PaymentMethodType } from '@/features/payment/types/PaymentMethod';
import { formatCurrency } from '@/utils/currency.util';
import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

type DebtPaymentModalProps = {
    orderId: string;
    needPaid: number;
    setShowPaymentModal: (show: boolean) => void;
};
export default function DebtPaymentModal({ orderId, needPaid, setShowPaymentModal }: DebtPaymentModalProps) {
    const { addOrderPayment } = useOrderPaymentManager();
    const { auth } = useAuthManager();
    const [paymentInfo, setPaymentInfo] = useState({
        paymentAmount: 0,
        paymentMethod: PaymentMethodType.CASH,
        paymentDate: new Date(),
        paymentNote: '',
    });
    const handleValueChange = (key: string, value: string | number | null | Date) => {
        setPaymentInfo((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const handleDateChange = (value: Date) => {
        setPaymentInfo((prev) => ({
            ...prev,
            paymentDate: value,
        }));
    };

    return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto'>
                <div className='p-6'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-xl font-semibold text-gray-900'>Thêm thanh toán</h2>
                        <button
                            onClick={() => setShowPaymentModal(false)}
                            className='text-gray-400 hover:text-gray-600'
                        >
                            <FaTimes className='text-xl' />
                        </button>
                    </div>

                    <div className='space-y-4'>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Mã đơn hàng</label>
                                <input
                                    type='text'
                                    value={orderId}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Còn phải trả</label>
                                <input
                                    type='text'
                                    value={formatCurrency(needPaid)}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                                    readOnly
                                />
                            </div>
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Số tiền thanh toán *</label>
                            <input
                                type='number'
                                value={paymentInfo.paymentAmount}
                                onChange={(e) => {
                                    if (parseFloat(e.target.value) > needPaid) {
                                        handleValueChange('paymentAmount', needPaid);
                                        return;
                                    }
                                    handleValueChange('paymentAmount', parseInt(e.target.value));
                                }}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                                placeholder='Nhập số tiền thanh toán'
                                max={needPaid}
                                min={0}
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Hình thức thanh toán *
                            </label>
                            <select
                                value={paymentInfo.paymentMethod}
                                onChange={(e) => handleValueChange('paymentMethod', e.target.value)}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                            >
                                <option value={PaymentMethodType.CASH}>Tiền mặt</option>
                                <option value={PaymentMethodType.BANK_TRANSFER}>Chuyển khoản</option>
                            </select>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Ngày thanh toán</label>
                            <input
                                type='date'
                                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
                                value={new Date(paymentInfo.paymentDate).toISOString().split('T')[0]}
                                onChange={(e) => handleDateChange(new Date(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Ghi chú</label>
                            <textarea
                                value={paymentInfo.paymentNote}
                                onChange={(e) => handleValueChange('paymentNote', e.target.value)}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-20 resize-none'
                                placeholder='Ghi chú về khoản thanh toán...'
                            ></textarea>
                        </div>
                    </div>

                    <div className='flex space-x-3 mt-6'>
                        <Button
                            variant='secondary'
                            onClick={() => setShowPaymentModal(false)}
                            className='bg-gray-500 hover:bg-gray-600 flex-1 text-white py-3 rounded-lg font-medium transition-colors'
                        >
                            <FaTimes className='mr-2 inline' />
                            Hủy
                        </Button>
                        <Button
                            onClick={() => {
                                addOrderPayment({
                                    orderId,
                                    paymentAmount: paymentInfo.paymentAmount,
                                    paymentMethod: paymentInfo.paymentMethod,
                                    paymentDate: paymentInfo.paymentDate,
                                    note: paymentInfo.paymentNote,
                                    createdBy: auth?.id ?? '',
                                });
                                setShowPaymentModal(false);
                            }}
                            className='bg-gradient-to-r from-green-500 to-green-700 flex-1 text-white py-3 rounded-lg font-medium hover:translate-y-[-1px] hover:shadow-lg transition-all'
                        >
                            <FaCheck className='mr-2 inline' />
                            Xác nhận thanh toán
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
