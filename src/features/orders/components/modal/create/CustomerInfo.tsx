import React, { useState } from 'react';
import { GoPersonFill } from 'react-icons/go';
import NewCustomerField from './customer/NewCustomerField';
import OldCustomerField from './customer/OldCustomerField';
import { Customer } from '@/features/customers/types/Customer';

type CustomerInfoProps = {
    customerInfo: Customer | null;
    onCustomerChange: (customer: Customer | null) => void;
    onSwitchCustomerType: (type: 'old' | 'new') => void;
};

const CustomerInfo = ({ customerInfo, onCustomerChange, onSwitchCustomerType }: CustomerInfoProps) => {
    const [customerType, setCustomerType] = useState('old');

    const handleSwitchCustomerType = (type: 'old' | 'new') => {
        setCustomerType(type);
        onSwitchCustomerType(type);
    };

    return (
        <div className='section-card p-6'>
            <div className='flex items-center mb-4'>
                <GoPersonFill className='text-blue-600 text-xl mr-3' />
                <h2 className='text-xl font-semibold text-gray-900'>Thông tin khách hàng</h2>
            </div>

            <div className='space-y-4'>
                <div className='flex space-x-6'>
                    <label className='flex items-center'>
                        <input
                            type='radio'
                            name='customerType'
                            value='old'
                            className='text-blue-600 mr-2'
                            checked={customerType === 'old'}
                            onChange={() => handleSwitchCustomerType('old')}
                        />
                        <span className='text-gray-700'>Khách hàng cũ</span>
                    </label>
                    <label className='flex items-center'>
                        <input
                            type='radio'
                            name='customerType'
                            value='new'
                            className='text-blue-600 mr-2'
                            checked={customerType === 'new'}
                            onChange={() => handleSwitchCustomerType('new')}
                        />
                        <span className='text-gray-700'>Khách hàng mới</span>
                    </label>
                </div>

                {customerType === 'old' ? (
                    <OldCustomerField
                        customerInfo={customerInfo}
                        onSelectCustomer={(customer) => onCustomerChange(customer)}
                    />
                ) : (
                    <NewCustomerField onCustomerChange={(customer) => onCustomerChange(customer)} />
                )}
            </div>
        </div>
    );
};

export default CustomerInfo;
