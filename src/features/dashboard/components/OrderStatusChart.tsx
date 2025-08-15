import { useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js/auto';
import { OrderStatus } from '@/features/orders/types/AdditionalOrderInfo';
import { useOrderManager } from '@/features/orders/hook/useOrderManager';

export default function OrderStatusChart() {
    const { orders } = useOrderManager();
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    const orderStatus = useMemo(() => {
        return ['Chờ xử lý', 'Đã xác nhận', 'Đang chuẩn bị', 'Đang giao hàng', 'Đã giao hàng', 'Đã hủy'];
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (!ctx) return;

            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
            const counts = {
                [OrderStatus.PENDING]: 0,
                [OrderStatus.CONFIRMED]: 0,
                [OrderStatus.REPAIRED]: 0,
                [OrderStatus.SHIPPING]: 0,
                [OrderStatus.DELIVERED]: 0,
                [OrderStatus.CANCELLED]: 0,
            };

            orders.forEach((order) => {
                counts[order.status]++;
            });

            const orderStatusData = [
                counts[OrderStatus.PENDING],
                counts[OrderStatus.CONFIRMED],
                counts[OrderStatus.REPAIRED],
                counts[OrderStatus.SHIPPING],
                counts[OrderStatus.DELIVERED],
                counts[OrderStatus.CANCELLED],
            ];
            chartInstanceRef.current = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: orderStatus,
                    datasets: [
                        {
                            data: orderStatusData,
                            backgroundColor: ['#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#6B7280', '#8B5CF6'],
                            borderWidth: 0,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                            },
                        },
                    },
                },
            });
        }

        return () => {
            chartInstanceRef.current?.destroy();
        };
    }, [orderStatus, orders]);

    return (
        <div>
            <h3 className='text-lg font-semibold text-gray-800 mb-6'>Trạng thái đơn hàng</h3>
            <div className='h-64'>
                <canvas ref={chartRef} width='300' height='300'></canvas>
            </div>
        </div>
    );
}
