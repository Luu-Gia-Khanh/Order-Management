import { OrderStatus } from '@/features/orders/types/AdditionalOrderInfo';

export const statusColors = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.PENDING:
            return 'bg-yellow-50 text-yellow-600';
        case OrderStatus.CONFIRMED:
            return 'bg-blue-50 text-blue-600';
        case OrderStatus.DELIVERED:
            return 'bg-green-50 text-green-600';
        case OrderStatus.CANCELLED:
            return 'bg-red-50 text-red-600';
        case OrderStatus.SHIPPING:
            return 'bg-orange-50 text-orange-600';
        case OrderStatus.REPAIRED:
            return 'bg-purple-50 text-purple-600';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const mapingOrderStatus = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.PENDING:
            return 'Chờ xử lý';
        case OrderStatus.CONFIRMED:
            return 'Đã xác nhận';
        case OrderStatus.REPAIRED:
            return 'Đang chuẩn bị';
        case OrderStatus.SHIPPING:
            return 'Đang giao hàng';
        case OrderStatus.DELIVERED:
            return 'Đã giao hàng';
        case OrderStatus.CANCELLED:
            return 'Đã hủy';

        default:
            return 'Không xác định';
    }
};
