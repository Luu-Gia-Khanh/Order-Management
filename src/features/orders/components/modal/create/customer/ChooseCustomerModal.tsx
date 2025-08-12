import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useCustomerManager } from '@/features/customers/hook/useCustomerManager';
import { FaTimes } from 'react-icons/fa';
import CustomerSearchTable from './CustomerSearchTable';
import { useState } from 'react';
import { Customer } from '@/features/customers/types/Customer';

type ChooseCustomerModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSelectCustomer: (customer: Customer) => void;
};
export default function ChooseCustomerModal({ isOpen, onClose, onSelectCustomer }: ChooseCustomerModalProps) {
    const { customers } = useCustomerManager();
    const [searchValue, setSearchValue] = useState('');
    const [tempSearchValue, setTempSearchValue] = useState('');

    if (!isOpen) return null;

    return (
        <div
            className='fixed inset-0 bg-gray-300 bg-opacity-70 flex items-center justify-center z-50'
            style={{ backgroundColor: 'rgba(156, 163, 175, 0.5)' }}
        >
            <div className='bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slideIn'>
                <div className=''>
                    <div className='p-6 border-b border-gray-200'>
                        <div className='flex items-center justify-between'>
                            <h3 className='text-xl font-semibold text-gray-800'>Tìm Khách Hàng</h3>
                            <button onClick={onClose} className='text-gray-400 hover:text-gray-600'>
                                <FaTimes />
                            </button>
                        </div>
                    </div>
                    <div className='px-6 pt-6'>
                        <div className='flex space-x-5 mb-6'>
                            <Input
                                value={tempSearchValue}
                                placeholder='Nhập tên hoặc số điện thoại khách hàng bạn muốn tìm '
                                onChange={(e) => {
                                    setTempSearchValue(e.target.value);
                                    if (e.target.value === '') {
                                        setSearchValue('');
                                    }
                                }}
                            />
                            <Button className='h-10 w-30' onClick={() => setSearchValue(tempSearchValue)}>
                                Tìm kiếm
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='px-6 pb-6 overflow-auto max-h-[70vh]'>
                    <CustomerSearchTable
                        searchValue={searchValue}
                        customers={customers}
                        onSelectCustomer={(customer: Customer) => {
                            console.log('Selected Customer:', customer);
                            onSelectCustomer(customer);
                            onClose();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
