import { FiShoppingCart, FiDollarSign, FiClock, FiUsers } from 'react-icons/fi';

const iconMap = {
    shoppingCart: FiShoppingCart,
    dollar: FiDollarSign,
    clock: FiClock,
    users: FiUsers,
};

const colorMap = {
    blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
    },
    green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
    },
    yellow: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600',
    },
    purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
    },
};

const trendMap = {
    up: {
        icon: '↑',
        color: 'text-green-600',
    },
    down: {
        icon: '↓',
        color: 'text-red-600',
    },
    warning: {
        icon: '⚠️',
        color: 'text-yellow-600',
    },
};

type MetricsCardProps = {
    title: string;
    value: string;
    icon: keyof typeof iconMap;
    trend: keyof typeof trendMap;
    trendValue: string;
    color: keyof typeof colorMap;
};

export default function MetricsCard({ title, value, icon, trend, trendValue, color }: MetricsCardProps) {
    const IconComponent = iconMap[icon];
    const colorClasses = colorMap[color];
    const trendClasses = trendMap[trend];

    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='text-gray-500 text-sm'>{title}</p>
                    <p className='text-2xl font-bold text-gray-800'>{value}</p>
                </div>
                <div className={`w-12 h-12 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`${colorClasses.text}`} />
                </div>
            </div>
            <div className={`mt-4 flex items-center ${trendClasses.color} text-sm`}>
                <span className='mr-1'>{trendClasses.icon}</span>
                <span>{trendValue}</span>
            </div>
        </div>
    );
}
