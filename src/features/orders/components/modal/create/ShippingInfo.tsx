import { DeliveryOrderInformation } from '@/features/orders/types/DeliveryOrderInformation';
import React, { useEffect, useMemo } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import ChooseDeliveryModal from './delivery/ChooseDeliveryModal';
import Button from '@/components/ui/Button';
import { MdNavigateNext } from 'react-icons/md';
import { FaShippingFast } from 'react-icons/fa';
import { useShippingManager } from '@/features/shipping/hook/useShippingManager';
import { formatCurrency } from '@/utils/currency.util';

type ShippingInfoProps = {
    deliveryInfo: DeliveryOrderInformation | null;
    setDeliveryInfo: React.Dispatch<React.SetStateAction<DeliveryOrderInformation | null>>;
};

const ShippingInfo = ({ deliveryInfo, setDeliveryInfo }: ShippingInfoProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { shippings } = useShippingManager();

    const handleDateChange = (key: string, value: Date | string | null) => {
        setDeliveryInfo((prev) => {
            if (!prev) {
                return {
                    deliveryDate: null,
                    deliveredAt: null,
                    cancelledAt: null,
                    shippingUnitId: null,
                    [key]: value,
                };
            }
            return {
                ...prev,
                [key]: value,
            };
        });
    };

    const shippingChoice = useMemo(() => {
        return shippings.find((shipping) => shipping.id === deliveryInfo?.shippingUnitId);
    }, [shippings, deliveryInfo]);

    const deliveryDate = useMemo(() => {
        if (!deliveryInfo?.deliveryDate) {
            return '';
        }

        const dateObj =
            deliveryInfo.deliveryDate instanceof Date ? deliveryInfo.deliveryDate : new Date(deliveryInfo.deliveryDate);

        return dateObj.toISOString().split('T')[0];
    }, [deliveryInfo?.deliveryDate]);

    useEffect(() => {
        console.log('deliveryInfo changed:', deliveryInfo);
    }, [deliveryInfo]);

    return (
        <div className='section-card p-6'>
            <div className='flex items-center mb-4'>
                <MdLocalShipping className='fas fa-truck text-green-600 text-xl mr-3'></MdLocalShipping>
                <h2 className='text-xl font-semibold text-gray-900'>Thông tin giao hàng</h2>
            </div>

            <div className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Ngày giao hàng</label>
                    <input
                        type='date'
                        value={deliveryDate}
                        className='form-input w-full p-3 text-gray-700'
                        onChange={(e) => handleDateChange('deliveryDate', new Date(e.target.value))}
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Phương thức giao hàng</label>
                    <Button
                        variant='outline'
                        className='flex items-center justify-between text-green-600 hover:bg-green-100 bg-green-50'
                        fullWidth
                        onClick={() => setIsOpen(true)}
                    >
                        <span className='flex items-center gap-2'>
                            Chọn phương thức giao hàng <FaShippingFast />
                        </span>

                        <MdNavigateNext />
                    </Button>
                    {deliveryInfo?.shippingUnitId && (
                        <div className='mt-2 font-medium text-sm text-gray-700 bg-green-50 rounded p-5'>
                            <div className='font-semibold text-2xl'>{shippingChoice?.name}</div>
                            <div>
                                <span className='font-semibold'>Liên hệ:</span> {shippingChoice?.contactPhone}
                            </div>
                            <div>$: {formatCurrency(shippingChoice?.baseFee ?? 0)}</div>
                        </div>
                    )}
                </div>
            </div>
            {isOpen && (
                <ChooseDeliveryModal
                    isOpen={isOpen}
                    shippingId={deliveryInfo?.shippingUnitId ?? null}
                    onSelectShipping={(value) => handleDateChange('shippingUnitId', value)}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default ShippingInfo;
