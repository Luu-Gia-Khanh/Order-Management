import { Customer } from '@/features/customers/types/Customer';
import React from 'react';

type NewCustomerFieldProps = {
    onCustomerChange?: (customer: Customer | null) => void;
};
export default function NewCustomerField({ onCustomerChange }: NewCustomerFieldProps) {
    const [customer, setCustomer] = React.useState<Customer>({
        id: '',
        name: '',
        phone: '',
        address: '',
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    const handleChangeInput = (key: string, value: string) => {
        setCustomer((prev) => ({
            ...prev,
            [key]: value,
        }));
        if (onCustomerChange) {
            onCustomerChange({ ...customer, [key]: value });
        }
    };
    return (
        <div className='space-y-4'>
            <input
                type='text'
                value={customer?.name || ''}
                placeholder='Tên khách hàng *'
                className='form-input w-full p-3 text-gray-700'
                required
                onChange={(e) => handleChangeInput('name', e.target.value)}
            />
            <input
                type='tel'
                value={customer?.phone || ''}
                placeholder='Số điện thoại *'
                className='form-input w-full p-3 text-gray-700'
                required
                onChange={(e) => handleChangeInput('phone', e.target.value)}
            />
            <textarea
                value={customer?.address || ''}
                placeholder='Địa chỉ *'
                className='form-input w-full p-3 text-gray-700 h-20 resize-none'
                required
                onChange={(e) => handleChangeInput('address', e.target.value)}
            ></textarea>
        </div>
    );
}
