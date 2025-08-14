'use client';
import Button from '@/components/ui/Button';
import { OrderFullInfo } from '@/features/orders/types/Order';
import { PaymentStatus } from '@/features/orders/types/TotalPayment';
import { PaymentMethodType } from '@/features/payment/types/PaymentMethod';
import { formatCurrency } from '@/utils/currency.util';
import { mapingOrderPaymentStatus } from '@/utils/status.util';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { PiMoneyWavyBold } from 'react-icons/pi';
import { SiMoneygram } from 'react-icons/si';

export default function OrderDetailPaymentInfo({ orderFullInfor }: { orderFullInfor: OrderFullInfo | null }) {
    const router = useRouter();
    const isPaid = orderFullInfor?.paymentStatus === PaymentStatus.PAID;
    const inforPaymentStatus = useMemo(() => {
        if (!orderFullInfor) return null;
        if (!orderFullInfor.paymentStatus) return null;
        return (
            <span className={`font-semibold  ${isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                {mapingOrderPaymentStatus(orderFullInfor?.paymentStatus)}
            </span>
        );
    }, [isPaid, orderFullInfor]);
    const isInstallment = orderFullInfor?.paymentMethod.code === PaymentMethodType.INSTALLMENT;
    const infoPaymentUtil = useMemo(() => {
        if (!orderFullInfor) return null;
        switch (orderFullInfor.paymentMethod.code) {
            case PaymentMethodType.CASH:
            case PaymentMethodType.COD:
                return null;
            case PaymentMethodType.BANK_TRANSFER:
                return (
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Thông tin ngân hàng:</span>
                        <div className='flex flex-col items-end space-y-1'>
                            <div className='font-medium text-sm text-gray-600'>
                                {orderFullInfor?.bankAccount?.bankName}
                            </div>
                            <div className='font-medium text-sm text-gray-600'>
                                {orderFullInfor?.bankAccount?.accountNumber}
                            </div>
                        </div>
                    </div>
                );
            case PaymentMethodType.INSTALLMENT:
                return (
                    <div>
                        <Button
                            className='flex items-center justify-center'
                            fullWidth
                            variant='outline'
                            onClick={() => {
                                router.push(`/orders/debt/${orderFullInfor.id}`);
                            }}
                        >
                            <SiMoneygram className='mr-2' />
                            Chi tiết công nợ
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    }, [orderFullInfor, router]);

    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center mb-4'>
                <PiMoneyWavyBold className='text-green-600 text-xl mr-3' />
                <h2 className='text-xl font-semibold text-gray-900'>Thông tin thanh toán</h2>
            </div>

            <div className='space-y-3'>
                <div className='flex justify-between'>
                    <span className='text-gray-600'>Hình thức thanh toán:</span>
                    <span className='font-semibold text-gray-600 text-sm'>{orderFullInfor?.paymentMethod.name}</span>
                </div>
                {infoPaymentUtil}
                <div className='flex justify-between'>
                    <span className='text-gray-600'>Trạng thái thanh toán:</span>
                    {inforPaymentStatus}
                </div>
                {isInstallment ? (
                    <div></div>
                ) : (
                    <div>
                        <hr className='border-gray-200' />
                        <div className='flex justify-between items-center'>
                            <span className='text-xl font-bold text-gray-900'>Còn phải thu:</span>
                            <span className={`text-2xl font-bold ${isPaid ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(isPaid ? 0 : orderFullInfor?.totalAmount || 0)}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
