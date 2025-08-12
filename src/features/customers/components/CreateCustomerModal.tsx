import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import { useCallback, useMemo, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useCustomerManager } from '../hook/useCustomerManager';

export default function CreateCustomerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { handleCreateCustomer } = useCustomerManager();
    const [customerInfo, setCustomerInfo] = useState<{
        name: string;
        phone: string;
        address: string;
    }>({
        name: '',
        phone: '',
        address: '',
    });

    const handleInputChange = useCallback((key: string, value: string) => {
        setCustomerInfo((prev) => ({ ...prev, [key]: value }));
    }, []);

    const handleChangePhoneNumber = (value: string) => {
        if (/^\d{0,10}$/.test(value)) {
            handleInputChange('phone', value);
        }
    };
    const isValid = useMemo(() => {
        return (
            customerInfo.name.trim() !== '' &&
            customerInfo.phone.trim() !== '' &&
            customerInfo.address.trim() !== '' &&
            /^\d{10}$/.test(customerInfo.phone)
        );
    }, [customerInfo.address, customerInfo.name, customerInfo.phone]);

    const handleAddCustomer = useCallback(() => {
        handleCreateCustomer(customerInfo);
        onClose();
    }, [customerInfo, handleCreateCustomer, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className='fixed inset-0 bg-gray-300 bg-opacity-70 flex items-center justify-center z-50'
            style={{ backgroundColor: 'rgba(156, 163, 175, 0.5)' }}
            // onClick={onClose}
        >
            <div
                className='bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slideIn'
                // onClick={(e) => e.stopPropagation()}
            >
                <div className='p-6 border-b border-gray-200'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-xl font-semibold text-gray-800'>Tạo khách hàng mới</h3>
                        <button onClick={onClose} className='text-gray-400 hover:text-gray-600'>
                            <FaTimes />
                        </button>
                    </div>
                </div>
                <div className='p-6'>
                    <div className='flex flex-col space-y-4'>
                        <div className='flex gap-4'>
                            <Input
                                value={customerInfo.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder='Nhập tên khách hàng'
                            />
                            <Input
                                type='tel'
                                value={customerInfo.phone}
                                pattern='[0-9]{10}'
                                maxLength={10}
                                onChange={(e) => handleChangePhoneNumber(e.target.value)}
                                placeholder='Nhập tên số điện thoại khách hàng'
                                required
                            />
                        </div>
                        <TextArea
                            value={customerInfo.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder='Nhập địa chỉ khách hàng'
                        />
                    </div>
                    <div className='flex items-center justify-end space-x-3 pt-6 border-t border-gray-200'>
                        <Button variant={'secondary'} onClick={onClose}>
                            Huỷ
                        </Button>
                        <Button disabled={!isValid} onClick={() => handleAddCustomer()}>
                            Thêm khách hàng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
