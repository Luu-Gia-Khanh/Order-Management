'use client';
import OrderDetailDeliveryInfor from '@/features/order-detail/components/OrderDetailDeliveryInfor';
import OrderDetailHeader from '@/features/order-detail/components/OrderDetailHeader';
import OrderDetailInforCustomer from '@/features/order-detail/components/OrderDetailInforCustomer';
import OrderDetailInforOrder from '@/features/order-detail/components/OrderDetailInforOrder';
import OrderDetailListProduct from '@/features/order-detail/components/OrderDetailListProduct';
import OrderDetailOrderStatus from '@/features/order-detail/components/OrderDetailOrderStatus';
import OrderDetailSumaryPayment from '@/features/order-detail/components/OrderDetailSumaryPayment';
import OrderDetailUpdateOrderStatus from '@/features/order-detail/components/OrderDetailUpdateOrderStatus';
import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useOrderManager } from '@/features/orders/hook/useOrderManager';

const OrderDetail = () => {
    const params = useParams();
    const id = params.id;

    const { ordersFullInfoById } = useOrderManager();
    const orderFullInfor = useMemo(() => {
        if (!id) return null;
        const orderId = Array.isArray(id) ? id[0] : id;
        return ordersFullInfoById(orderId) ?? null;
    }, [id, ordersFullInfoById]);

    return (
        <div className='bg-gray-50 min-h-screen py-6'>
            <div className='max-w-7xl mx-auto px-4'>
                {/* Header */}
                <div className='bg-white p-6 mb-6 rounded-xl shadow-sm border border-gray-200'>
                    <OrderDetailHeader />
                </div>

                <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
                    {/* Main Content */}
                    <div className='xl:col-span-2 space-y-6'>
                        {/* Thông tin đơn hàng */}
                        <OrderDetailInforOrder orderFullInfor={orderFullInfor} />

                        {/* Thông tin khách hàng */}
                        <OrderDetailInforCustomer orderFullInfor={orderFullInfor} />

                        {/* Danh sách sản phẩm */}
                        <OrderDetailListProduct orderFullInfor={orderFullInfor} />

                        {/* Tổng kết thanh toán */}
                        <OrderDetailSumaryPayment orderFullInfor={orderFullInfor} />
                    </div>

                    {/* Sidebar */}
                    <div className='space-y-6'>
                        {/* Trạng thái đơn hàng */}
                        <OrderDetailOrderStatus orderFullInfor={orderFullInfor} />

                        {/* Cập nhật trạng thái */}
                        <OrderDetailUpdateOrderStatus orderFullInfor={orderFullInfor} />

                        {/* Thông tin vận chuyển */}
                        <OrderDetailDeliveryInfor orderFullInfor={orderFullInfor} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
