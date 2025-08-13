import { IoTime } from 'react-icons/io5';
import { OrderStatus } from '@/features/orders/types/AdditionalOrderInfo';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { IoChevronDown, IoCheckmarkCircle, IoConstruct, IoCarSport, IoGift, IoCloseCircle } from 'react-icons/io5';

type OrderStatusSelectProps = {
    statusValue: OrderStatus;
    onStatusChange: (status: OrderStatus) => void;
};
export default function OrderStatusSelect({ statusValue, onStatusChange }: OrderStatusSelectProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownDirection, setDropdownDirection] = useState<'down' | 'up'>('down');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const statusConfig = useMemo(() => {
        return {
            [OrderStatus.PENDING]: {
                label: 'Chờ xử lý',
                icon: IoTime,
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-200',
                hoverColor: 'hover:bg-yellow-100',
            },
            [OrderStatus.CONFIRMED]: {
                label: 'Đã xác nhận',
                icon: IoCheckmarkCircle,
                color: 'text-blue-600',
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200',
                hoverColor: 'hover:bg-blue-100',
            },
            [OrderStatus.REPAIRED]: {
                label: 'Đang chuẩn bị',
                icon: IoConstruct,
                color: 'text-purple-600',
                bgColor: 'bg-purple-50',
                borderColor: 'border-purple-200',
                hoverColor: 'hover:bg-purple-100',
            },
            [OrderStatus.SHIPPING]: {
                label: 'Đang giao hàng',
                icon: IoCarSport,
                color: 'text-orange-600',
                bgColor: 'bg-orange-50',
                borderColor: 'border-orange-200',
                hoverColor: 'hover:bg-orange-100',
            },
            [OrderStatus.DELIVERED]: {
                label: 'Đã giao hàng',
                icon: IoGift,
                color: 'text-green-600',
                bgColor: 'bg-green-50',
                borderColor: 'border-green-200',
                hoverColor: 'hover:bg-green-100',
            },
            [OrderStatus.CANCELLED]: {
                label: 'Đã hủy',
                icon: IoCloseCircle,
                color: 'text-red-600',
                bgColor: 'bg-red-50',
                borderColor: 'border-red-200',
                hoverColor: 'hover:bg-red-100',
            },
        };
    }, []);
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    useEffect(() => {
        console.log('OrderStatusSelect mounted', statusValue);
    }, [statusValue]);

    const currentStatus = statusConfig[statusValue];
    const CurrentIcon = currentStatus.icon;

    const handleStatusChange = (status: OrderStatus) => {
        onStatusChange(status);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        if (!isDropdownOpen && dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;
            const dropdownHeight = 300; // Estimated dropdown height

            // Nếu không đủ chỗ phía dưới nhưng có đủ chỗ phía trên
            if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
                setDropdownDirection('up');
            } else {
                setDropdownDirection('down');
            }
        }
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Trạng thái đơn hàng</label>

            <div className='relative' ref={dropdownRef}>
                {/* Selected Status Button */}
                <button
                    type='button'
                    onClick={toggleDropdown}
                    className={`w-full cursor-pointer p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 ${currentStatus.bgColor} ${currentStatus.borderColor} ${currentStatus.hoverColor}`}
                >
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-3'>
                            <CurrentIcon className={`h-5 w-5 ${currentStatus.color}`} />
                            <span className={`font-medium ${currentStatus.color}`}>{currentStatus.label}</span>
                        </div>
                        <IoChevronDown
                            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                                isDropdownOpen ? 'rotate-180' : ''
                            }`}
                        />
                    </div>
                </button>

                {/* Dropdown Options */}
                {isDropdownOpen && (
                    <div
                        className={`absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 max-h-80 overflow-y-auto ${
                            dropdownDirection === 'up' ? 'bottom-full mb-2 mt-0' : 'top-full'
                        }`}
                    >
                        {Object.entries(statusConfig).map(([status, config]) => {
                            const Icon = config.icon;
                            const isSelected = status === statusValue;

                            return (
                                <button
                                    key={status}
                                    type='button'
                                    onClick={() => handleStatusChange(status as OrderStatus)}
                                    className={`w-full cursor-pointer p-3 text-left hover:bg-gray-50 transition-colors duration-150 border-l-4 ${
                                        isSelected
                                            ? `${config.borderColor} ${config.bgColor}`
                                            : 'border-transparent hover:border-gray-200'
                                    }`}
                                >
                                    <div className='flex items-center space-x-3'>
                                        <Icon className={`h-5 w-5 ${config.color}`} />
                                        <span className={`font-medium ${isSelected ? config.color : 'text-gray-700'}`}>
                                            {config.label}
                                        </span>
                                        {isSelected && <IoCheckmarkCircle className='h-4 w-4 text-blue-500 ml-auto' />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
