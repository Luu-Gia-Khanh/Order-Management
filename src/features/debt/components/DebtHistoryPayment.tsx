import Button from '@/components/ui/Button';
import { useAuthManager } from '@/features/auth/hook/useAuthManager';
import { OrderPayment } from '@/features/order-payment/types/OrderPayment';
import { OrderFullInfo } from '@/features/orders/types/Order';
import { PaymentMethodType } from '@/features/payment/types/PaymentMethod';
import { usePaymentManager } from '@/hooks/usePaymentManager';
import { formatCurrency } from '@/utils/currency.util';
import { formatDate } from '@/utils/date.util';
import React, { useCallback, useMemo } from 'react';
import { FaHistory, FaPlus } from 'react-icons/fa';

export default function DebtHistoryPayment({
    isDone,
    orderInfo,
    orderPayments,
    deadlinePayment,
    onAddPayment,
}: {
    isDone: boolean;
    orderInfo: OrderFullInfo | null;
    orderPayments: OrderPayment[];
    deadlinePayment: Date;
    onAddPayment: () => void;
}) {
    const { payments } = usePaymentManager();
    const { auths } = useAuthManager();
    const paymentByCode = useCallback(
        (code: string) => {
            return payments.find((payment) => payment.code === code);
        },
        [payments]
    );
    const getAuthById = useCallback(
        (id: string) => {
            return auths.find((auth) => auth.id === id);
        },
        [auths]
    );
    const sortedPayments = useMemo(() => {
        return orderPayments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [orderPayments]);
    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
            <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center'>
                    <FaHistory className='text-purple-600 text-xl mr-3' />
                    <h2 className='text-xl font-semibold text-gray-900'>Lịch sử thanh toán</h2>
                </div>
                {!isDone && (
                    <Button
                        className='no-print bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm hover:translate-y-[-1px] hover:shadow-lg transition-all'
                        onClick={onAddPayment}
                    >
                        <FaPlus className='mr-2 inline' />
                        Thêm thanh toán
                    </Button>
                )}
            </div>

            <div className='space-y-4'>
                {sortedPayments.map((payment, index) => {
                    return (
                        <div key={payment.id} className='relative pl-10'>
                            <div className='bg-white border border-gray-200 rounded-lg p-4'>
                                <div className='flex items-center justify-between mb-3'>
                                    <div>
                                        <p className='font-semibold text-gray-900'>
                                            Thanh toán lần {sortedPayments.length - index}
                                        </p>
                                        <p className='text-sm text-gray-600'>
                                            {formatDate(payment.createdAt, 'dd/MM/yyyy HH:mm')}
                                        </p>
                                    </div>
                                    <div className='text-right'>
                                        <p className='font-bold text-green-600 text-lg'>
                                            {formatCurrency(payment.paymentAmount)}
                                        </p>
                                        <p className='text-xs text-gray-500'>
                                            {paymentByCode(payment.paymentMethod)?.name ?? 'Không xác định'}
                                        </p>
                                    </div>
                                </div>
                                <div className='text-sm text-gray-600 bg-gray-50 rounded p-3'>
                                    <p>
                                        <strong>Ghi chú:</strong> {payment.note || 'Không có ghi chú'}
                                    </p>
                                    {paymentByCode(payment.paymentMethod)?.code === PaymentMethodType.CASH ? (
                                        <p>
                                            <strong>Người nhận:</strong>{' '}
                                            {getAuthById(payment.createdBy)?.fullName || 'Không xác định'}
                                        </p>
                                    ) : (
                                        <div>
                                            {/* <p>
                                                <strong>Số tài khoản:</strong> {orderInfo?.bankAccount?.accountNumber} -{' '}
                                                {orderInfo?.bankAccount?.bankName}
                                            </p> */}
                                            <p>
                                                <strong>Người xác nhận:</strong>{' '}
                                                {getAuthById(payment.createdBy)?.fullName || 'Không xác định'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='absolute left-3 top-4 w-3 h-3 rounded-full bg-green-500'></div>
                            <div className='absolute left-[18px] top-7 w-0.5 h-full bg-gray-200'></div>
                        </div>
                    );
                })}

                {/* Order Created */}
                <div className='relative pl-10'>
                    <div className='bg-white border border-gray-200 rounded-lg p-4'>
                        <div className='flex items-center justify-between mb-3'>
                            <div>
                                <p className='font-semibold text-gray-900'>Tạo đơn hàng</p>
                                <p className='text-sm text-gray-600'>
                                    {orderInfo?.createdAt && formatDate(orderInfo?.createdAt, 'dd/MM/yyyy HH:mm')}
                                </p>
                            </div>
                            <div className='text-right'>
                                <p className='font-bold text-gray-900 text-lg'>
                                    {formatCurrency(orderInfo?.totalAmount ?? 0)}
                                </p>
                                <p className='text-xs text-gray-500'>Công nợ {orderInfo?.paymentDays} ngày</p>
                            </div>
                        </div>
                        <div className='text-sm text-gray-600 bg-gray-50 rounded p-3'>
                            <p>
                                <strong>Ghi chú:</strong> Đơn hàng được tạo với hình thức thanh toán công nợ
                            </p>
                            <p>
                                <strong>Hạn thanh toán:</strong> {formatDate(deadlinePayment, 'dd/MM/yyyy')}
                            </p>
                            <p>
                                <strong>Người tạo:</strong> {orderInfo?.auth?.fullName}
                            </p>
                        </div>
                    </div>
                    <div className='absolute left-3 top-4 w-3 h-3 rounded-full bg-green-500'></div>
                </div>
            </div>
        </div>
    );
}
