import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function OrderStatusChart() {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (!ctx) return;

            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            chartInstanceRef.current = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Hoàn thành', 'Đang xử lý', 'Đang giao', 'Chờ xử lý', 'Đã hủy'],
                    datasets: [
                        {
                            data: [45, 20, 15, 12, 8],
                            backgroundColor: ['#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#6B7280'],
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
    }, []);

    return (
        <div>
            <h3 className='text-lg font-semibold text-gray-800 mb-6'>Trạng thái đơn hàng</h3>
            <div className='h-64'>
                <canvas ref={chartRef} width='300' height='300'></canvas>
            </div>
        </div>
    );
}
