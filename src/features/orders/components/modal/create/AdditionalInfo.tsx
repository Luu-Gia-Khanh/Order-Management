import OrderStatusSelect from '@/components/ui/status/OrderStatusSelect';
import { AdditionalOrderInfo } from '@/features/orders/types/AdditionalOrderInfo';
import { mapingOrderStatus, statusColors } from '@/utils/status.util';
import { FaInfoCircle } from 'react-icons/fa';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';
import { useState } from 'react';
import StatusUpdateDialog from './status/StatusUpdateDialog';
import { useOrderManager } from '@/features/orders/hook/useOrderManager';
import { useAuthManager } from '@/features/auth/hook/useAuthManager';

type AdditionalInfoProps = {
    orderId: string;
    isUpdate: boolean;
    additionalInfo: AdditionalOrderInfo;
    setAdditionalInfo: React.Dispatch<React.SetStateAction<AdditionalOrderInfo>>;
};
const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ orderId, isUpdate, additionalInfo, setAdditionalInfo }) => {
    const { updateOrderStatus } = useOrderManager();
    const { auth } = useAuthManager();
    const [isOpen, setOpen] = useState(false);
    return (
        <div className='section-card p-6'>
            <div className='flex items-center mb-4'>
                <FaInfoCircle className='text-blue-600 text-xl mr-3' />
                <h2 className='text-xl font-semibold text-gray-900'>Thông tin khác</h2>
            </div>

            <div className='space-y-6'>
                {/* Ghi chú đơn hàng */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Ghi chú đơn hàng</label>
                    <textarea
                        value={additionalInfo.notes}
                        onChange={(e) => setAdditionalInfo({ ...additionalInfo, notes: e.target.value })}
                        placeholder='Nhập ghi chú cho đơn hàng...'
                        className='form-input w-full p-3 text-gray-700 h-24 resize-none border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200'
                    />
                </div>

                {/* Trạng thái - Custom Dropdown */}
                {isUpdate ? (
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Trạng thái đơn hàng</label>

                        <button
                            className='cursor-pointer hover:shadow-md focus:outline-none'
                            onClick={() => setOpen(true)}
                        >
                            <span
                                className={`flex justify-center items-center px-12 py-4 rounded text-sm font-semibold uppercase tracking-wide ${statusColors(
                                    additionalInfo.orderStatus
                                )}`}
                            >
                                <BiSolidMessageSquareEdit size={25} className='mr-2' />
                                {mapingOrderStatus(additionalInfo.orderStatus)}
                            </span>
                        </button>
                    </div>
                ) : (
                    <OrderStatusSelect
                        statusValue={additionalInfo.orderStatus}
                        onStatusChange={(status) => setAdditionalInfo({ ...additionalInfo, orderStatus: status })}
                    />
                )}
            </div>
            <StatusUpdateDialog
                isOpen={isOpen}
                status={additionalInfo.orderStatus}
                onClose={() => setOpen(false)}
                onUpdateStatus={(newStatus, note) => {
                    setAdditionalInfo({ ...additionalInfo, orderStatus: newStatus });
                    updateOrderStatus(orderId, additionalInfo.orderStatus, newStatus, note, auth?.id ?? '').then(
                        () => {}
                    );
                    setOpen(false);
                }}
            />
        </div>
    );
};

export default AdditionalInfo;
