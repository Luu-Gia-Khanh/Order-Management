import { usePaymentManager } from '@/hooks/usePaymentManager';
import React from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { PaymentOrderInfo } from '@/features/payment/types/PaymentOrderInfo';
import Input from '@/components/ui/Input';

type PaymentMethodProps = {
    paymentInfo: PaymentOrderInfo | null;
    setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentOrderInfo | null>>;
};
const PaymentMethod = ({ paymentInfo, setPaymentInfo }: PaymentMethodProps) => {
    const { payments } = usePaymentManager();
    const { bankName, accountNumber, paymentDays, id } = paymentInfo || {};

    const handleChangeValue = (key: keyof PaymentOrderInfo, value: string | number | null) => {
        setPaymentInfo((prev) => {
            if (!prev) {
                return {
                    id: '',
                    paymentDays: null,
                    bankName: '',
                    accountNumber: '',
                    [key]: value,
                };
            }
            return {
                ...prev,
                [key]: value,
            };
        });
    };

    return (
        <div className='section-card p-6'>
            <div className='flex items-center mb-4'>
                <FaCreditCard className='fas fa-credit-card text-purple-600 text-xl mr-3'></FaCreditCard>
                <h2 className='text-xl font-semibold text-gray-900'>Hình thức thanh toán</h2>
            </div>

            <div className='space-y-4'>
                <RadioGroup
                    by={(a, b) => a === b}
                    value={id ?? (payments[0]?.id || '')}
                    onChange={(value) => {
                        handleChangeValue('id', value);
                    }}
                    aria-label='Server size'
                    className='space-y-2 mt-2'
                >
                    {payments.map((plan) => (
                        <div key={plan.id}>
                            <Radio
                                key={plan.id}
                                value={plan.id}
                                className='group relative border-1 border-[#e5e7eb] flex cursor-pointer rounded-lg bg-white-500/5 px-5 py-4 text-black shadow-md transition focus:not-data-focus:outline-none data-checked:bg-white/10 data-focus:outline data-focus:outline-white'
                            >
                                <div className='flex w-full items-center justify-between'>
                                    <div className='text-sm/6 text-gray-700'>
                                        <p className='font-semibold '>{plan.name}</p>
                                        <div className='gap-2 '>
                                            <div className='font-medium mt-2'>{plan.description}</div>
                                        </div>
                                    </div>
                                    <CheckCircleIcon className='size-6 opacity-0 transition group-data-checked:opacity-100 ml-3' />
                                </div>
                            </Radio>
                            {id === plan.id &&
                                (() => {
                                    switch (plan.code) {
                                        case 'BANK_TRANSFER':
                                            return (
                                                <div className='space-y-4 p-5 mx-2 my-3 rounded bg-gray-50 border border-gray-100'>
                                                    <div>
                                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                                            Tên ngân hàng
                                                        </label>
                                                        <Input
                                                            value={bankName || ''}
                                                            type='text'
                                                            placeholder='Nhập tên ngân hàng'
                                                            className='form-input w-full p-3 text-gray-700'
                                                            onChange={(e) =>
                                                                handleChangeValue('bankName', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                                                            Số tài khoản
                                                        </label>
                                                        <Input
                                                            value={accountNumber || ''}
                                                            type='text'
                                                            placeholder='Nhập số tài khoản'
                                                            className='form-input w-full p-3 text-gray-700'
                                                            onChange={(e) =>
                                                                handleChangeValue('accountNumber', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            );

                                        case 'INSTALLMENT':
                                            return (
                                                <div className='p-4 mx-2 my-3 rounded bg-gray-50 border border-gray-100'>
                                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                                        Số ngày trả
                                                    </label>
                                                    <Input
                                                        value={paymentDays || ''}
                                                        type='number'
                                                        placeholder='Nhập số ngày'
                                                        className='form-input w-full p-3 text-gray-700'
                                                        min='1'
                                                        onChange={(e) =>
                                                            handleChangeValue('paymentDays', parseInt(e.target.value))
                                                        }
                                                    />
                                                </div>
                                            );
                                        case 'CASH':
                                        case 'COD':
                                            return null;
                                        default:
                                            return null;
                                    }
                                })()}
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    );
};

export default PaymentMethod;
