import Button from '@/components/ui/Button';
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

type ActionButtonsProps = {
    isValid: boolean;
    onCreate: () => void;
    onCancel: () => void;
};
const ActionButtons = ({ isValid, onCreate, onCancel }: ActionButtonsProps) => {
    const cancelOrder = () => {
        if (confirm('Bạn có chắc chắn muốn hủy tạo đơn hàng?')) {
            onCancel();
        }
    };

    return (
        <div className='flex flex-col sm:flex-row gap-4 mt-8 justify-center'>
            <Button
                disabled={!isValid}
                onClick={onCreate}
                className='flex justify-center items-center btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg'
            >
                <FaCheck className='fas fa-check mr-2' />
                TẠO ĐƠN HÀNG
            </Button>
            <Button
                variant='secondary'
                onClick={cancelOrder}
                className='flex justify-center items-center bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors'
            >
                <IoClose className='fas fa-times mr-2 text-3xl' />
                HỦY
            </Button>
        </div>
    );
};

export default ActionButtons;
