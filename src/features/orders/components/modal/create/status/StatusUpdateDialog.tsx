import OrderStatusSelect from '@/components/ui/status/OrderStatusSelect';
import { OrderStatus } from '@/features/orders/types/AdditionalOrderInfo';
import { useEffect, useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';

export default function StatusUpdateDialog({
    isOpen,
    status,
    onClose,
    onUpdateStatus,
}: {
    isOpen: boolean;
    status: OrderStatus;
    onClose: () => void;
    onUpdateStatus: (newStatus: OrderStatus, note: string) => void;
}) {
    const [newStatus, setNewStatus] = useState(OrderStatus.PENDING);
    const [note, setNote] = useState('');
    useEffect(() => {
        setNewStatus(status);
    }, [status]);
    if (!isOpen) return null;

    return (
        <div
            className='fixed inset-0 bg-gray-300 bg-opacity-70 flex items-center justify-center z-50'
            style={{ backgroundColor: 'rgba(156, 163, 175, 0.5)' }}
            onClick={onClose}
        >
            <div
                className='bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slideIn'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='p-10'>
                    <div className='flex items-center mb-4'>
                        <FaEdit className='text-green-600 text-xl mr-3' />
                        <h2 className='text-xl font-semibold text-gray-900'>Cập nhật trạng thái</h2>
                    </div>

                    <div className='space-y-4'>
                        <OrderStatusSelect statusValue={newStatus} onStatusChange={setNewStatus} />
                        <textarea
                            value={note}
                            placeholder='Ghi chú cập nhật...'
                            className='w-full p-3 border border-gray-300 rounded-lg h-20 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            onChange={(e) => setNote(e.target.value)}
                        ></textarea>
                        <button
                            onClick={() => onUpdateStatus(newStatus, note)}
                            className='cursor-pointer bg-gradient-to-r from-green-500 to-green-700 w-full text-white py-3 rounded-lg font-medium hover:translate-y-[-1px] hover:shadow-lg transition-all'
                        >
                            <FaSave className='mr-2 inline' />
                            Cập nhật trạng thái
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
