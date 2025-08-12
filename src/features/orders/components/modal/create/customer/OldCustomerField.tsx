import Button from '@/components/ui/Button';
import React, { useState } from 'react';
import ChooseCustomerModal from './ChooseCustomerModal';
import { Customer } from '@/features/customers/types/Customer';

type OldCustomerFieldProps = {
    customerInfo: Customer | null;
    onSelectCustomer: (customer: Customer) => void; // Adjust type as needed
};
export default function OldCustomerField({ customerInfo, onSelectCustomer }: OldCustomerFieldProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleChooseCustomer = () => {
        setIsOpen(true);
    };
    return (
        <div>
            <div className='flex items-center space-x-6'>
                <Button variant='outline' className='w-50 max-w-50' onClick={handleChooseCustomer}>
                    Chọn khách hàng
                </Button>
                {customerInfo && (
                    <div className='mt-4'>
                        <p className='text-gray-700'>Khách hàng đã chọn: {customerInfo.name}</p>
                        <p className='text-gray-500'>Số điện thoại: {customerInfo.phone}</p>
                        <p className='text-gray-500'>Địa chỉ: {customerInfo.address}</p>
                    </div>
                )}
            </div>
            <ChooseCustomerModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSelectCustomer={(customer: Customer) => {
                    onSelectCustomer(customer);
                }}
            />
        </div>
    );
}
