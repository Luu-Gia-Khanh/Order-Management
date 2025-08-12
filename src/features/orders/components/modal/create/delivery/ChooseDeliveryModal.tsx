import { FaTimes } from 'react-icons/fa';
import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useShippingManager } from '@/features/shipping/hook/useShippingManager';
import { formatCurrency } from '@/utils/currency.util';

type ChooseDeliveryModalProps = {
    isOpen: boolean;
    onClose: () => void;
    shippingId: string | null;
    onSelectShipping: (shippingId: string | null) => void;
};
export default function ChooseDeliveryModal({
    isOpen,
    onClose,
    shippingId,
    onSelectShipping,
}: ChooseDeliveryModalProps) {
    const { shippings } = useShippingManager();

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
                            <h3 className='text-xl font-semibold text-gray-800'>Chọn đơn vị vận chuyển</h3>
                            <button onClick={onClose} className='text-gray-400 hover:text-gray-600'>
                                <FaTimes />
                            </button>
                        </div>
                    </div>
                </div>

                <div className='px-6 pb-6'>
                    <div>
                        <RadioGroup
                            by={(a, b) => a === b}
                            value={shippingId}
                            onChange={(value) => {
                                onSelectShipping(value);
                                onClose();
                            }}
                            aria-label='Server size'
                            className='space-y-2 grid grid-cols-2 gap-4 mt-2'
                        >
                            {shippings.map((plan) => (
                                <Radio
                                    key={plan.id}
                                    value={plan.id}
                                    className='group relative border-1 border-[#e5e7eb] flex cursor-pointer rounded-lg bg-white-500/5 px-5 py-4 text-black shadow-md transition focus:not-data-focus:outline-none data-checked:bg-white/10 data-focus:outline data-focus:outline-white'
                                >
                                    <div className='flex w-full items-center justify-between'>
                                        <div className='text-sm/6 text-gray-700'>
                                            <p className='font-semibold '>{plan.name}</p>
                                            <div className='gap-2 '>
                                                <div className='flex items-center gap-2 mt-2'>
                                                    <span className='font-semibold'>Liên hệ:</span> {plan.contactPhone}
                                                </div>
                                                <div className='flex items-center gap-2 mt-2'>
                                                    <span className='font-semibold'>$:</span>{' '}
                                                    <div>{formatCurrency(plan.baseFee)}</div>
                                                </div>

                                                <div className='font-medium mt-2'>{plan.description}</div>
                                            </div>
                                        </div>
                                        <CheckCircleIcon className='size-6  opacity-0 transition group-data-checked:opacity-100' />
                                    </div>
                                </Radio>
                            ))}
                        </RadioGroup>
                    </div>
                </div>
            </div>
        </div>
    );
}
