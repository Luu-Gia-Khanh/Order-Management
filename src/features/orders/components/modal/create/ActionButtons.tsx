import Button from '@/components/ui/Button';
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

type ActionButtonsProps = {
    onCreate: () => void;
    onCancel: () => void;
};
const ActionButtons = ({ onCreate, onCancel }: ActionButtonsProps) => {
    const createOrder = () => {
        // Validate and create order logic
        alert('Đơn hàng đã được tạo thành công!');
    };

    const cancelOrder = () => {
        if (confirm('Bạn có chắc chắn muốn hủy tạo đơn hàng?')) {
            // Reset form or redirect
            window.location.reload();
        }
    };

    return (
        <div className='flex flex-col sm:flex-row gap-4 mt-8 justify-center'>
            <Button
                onClick={onCreate}
                className='flex justify-center items-center btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg'
            >
                <FaCheck className='fas fa-check mr-2' />
                TẠO ĐƠN HÀNG
            </Button>
            <Button
                variant='secondary'
                onClick={onCancel}
                className='flex justify-center items-center bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors'
            >
                <IoClose className='fas fa-times mr-2 text-3xl' />
                HỦY
            </Button>
        </div>
    );
};

export default ActionButtons;
