import { AdditionalOrderInfo, OrderStatus } from '@/features/orders/types/AdditionalOrderInfo';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import {
    IoChevronDown,
    IoTime,
    IoCheckmarkCircle,
    IoConstruct,
    IoCarSport,
    IoGift,
    IoCloseCircle,
} from 'react-icons/io5';
type AdditionalInfoProps = {
    additionalInfo: AdditionalOrderInfo;
    setAdditionalInfo: React.Dispatch<React.SetStateAction<AdditionalOrderInfo>>;
};
const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ additionalInfo, setAdditionalInfo }) => {
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

    const currentStatus = statusConfig[additionalInfo.orderStatus];
    const CurrentIcon = currentStatus.icon;

    const handleStatusChange = (status: OrderStatus) => {
        setAdditionalInfo({ ...additionalInfo, orderStatus: status });
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
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Trạng thái đơn hàng</label>

                    <div className='relative' ref={dropdownRef}>
                        {/* Selected Status Button */}
                        <button
                            type='button'
                            onClick={toggleDropdown}
                            className={`w-full p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 ${currentStatus.bgColor} ${currentStatus.borderColor} ${currentStatus.hoverColor}`}
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
                                    const isSelected = status === additionalInfo.orderStatus;

                                    return (
                                        <button
                                            key={status}
                                            type='button'
                                            onClick={() => handleStatusChange(status as OrderStatus)}
                                            className={`w-full p-3 text-left hover:bg-gray-50 transition-colors duration-150 border-l-4 ${
                                                isSelected
                                                    ? `${config.borderColor} ${config.bgColor}`
                                                    : 'border-transparent hover:border-gray-200'
                                            }`}
                                        >
                                            <div className='flex items-center space-x-3'>
                                                <Icon className={`h-5 w-5 ${config.color}`} />
                                                <span
                                                    className={`font-medium ${
                                                        isSelected ? config.color : 'text-gray-700'
                                                    }`}
                                                >
                                                    {config.label}
                                                </span>
                                                {isSelected && (
                                                    <IoCheckmarkCircle className='h-4 w-4 text-blue-500 ml-auto' />
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Alternative: Native Select với styling đẹp */}
                {/* Uncomment nếu muốn dùng native select thay vì custom dropdown
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Trạng thái (Select đơn giản)
                    </label>
                    <div className="relative">
                        <select
                            className='form-input w-full p-3 pr-10 text-gray-700 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-300'
                            value={additionalInfo.orderStatus}
                            onChange={(e) =>
                                setAdditionalInfo({ ...additionalInfo, orderStatus: e.target.value as OrderStatus })
                            }
                        >
                            <option value={OrderStatus.PENDING}>⏰ Chờ xử lý</option>
                            <option value={OrderStatus.CONFIRMED}>✅ Đã xác nhận</option>
                            <option value={OrderStatus.REPAIRED}>🔧 Đang chuẩn bị</option>
                            <option value={OrderStatus.SHIPPING}>🚗 Đang giao hàng</option>
                            <option value={OrderStatus.DELIVERED}>🎁 Đã giao hàng</option>
                            <option value={OrderStatus.CANCELLED}>❌ Đã hủy</option>
                        </select>
                        <IoChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                */}
            </div>
        </div>
    );
};

export default AdditionalInfo;
