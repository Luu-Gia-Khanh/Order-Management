import { TotalPayment } from '@/features/orders/types/TotalPayment';
import { formatCurrency } from '@/utils/currency.util';
import React, { useMemo } from 'react';
import { FaCalculator } from 'react-icons/fa6';

type PaymentSummaryProps = {
    shippingFee: number;
    subTotal: number;
    totalPayment: TotalPayment;
    setTotalPayment: React.Dispatch<React.SetStateAction<TotalPayment>>;
};
const PaymentSummary = ({ totalPayment, shippingFee, subTotal, setTotalPayment }: PaymentSummaryProps) => {
    const totalAmount = useMemo(() => {
        return subTotal + shippingFee - totalPayment.prepayAmount;
    }, [subTotal, shippingFee, totalPayment.prepayAmount]);
    return (
        <div className='section-card p-6'>
            <div className='flex items-center mb-4'>
                <FaCalculator className='fas fa-calculator text-green-600 text-xl mr-3'></FaCalculator>
                <h2 className='text-xl font-semibold text-gray-900'>Chi phí & Thanh toán</h2>
            </div>

            <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                    <label className='text-gray-700'>Số tiền trả trước:</label>
                    <input
                        type='number'
                        className='form-input w-32 p-2 text-right'
                        value={totalPayment.prepayAmount}
                        max={subTotal + shippingFee}
                        min={0}
                        step={100000}
                        onChange={(e) => {
                            if (parseFloat(e.target.value) > subTotal + shippingFee) {
                                alert('Số tiền trả trước không được lớn hơn tổng thanh toán.');
                                return;
                            }
                            setTotalPayment({ ...totalPayment, prepayAmount: parseFloat(e.target.value) || 0 });
                        }}
                    />
                </div>
                <div className='flex justify-between items-center'>
                    <label className='text-gray-700'>Phí giao hàng:</label>
                    <input type='text' className='form-input w-32 p-2 text-right' value={shippingFee} readOnly />
                </div>
                <div className='flex items-center'>
                    <input
                        id='vatInvoice'
                        type='checkbox'
                        className='text-blue-600 mr-3'
                        checked={totalPayment.vatInvoice}
                        onChange={(e) => setTotalPayment({ ...totalPayment, vatInvoice: e.target.checked })}
                    />
                    <label htmlFor='vatInvoice' className='text-gray-700 cursor-pointer'>
                        Xuất hóa đơn VAT
                    </label>
                </div>
                <div className='border-t border-gray-200 pt-4'>
                    <div className='flex justify-between items-center'>
                        <span className='text-xl font-bold text-gray-900'>Tổng thanh toán:</span>
                        <span className='text-2xl font-bold text-green-600'>{formatCurrency(totalAmount)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSummary;
