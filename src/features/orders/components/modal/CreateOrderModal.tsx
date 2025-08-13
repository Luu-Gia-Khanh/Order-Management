import OrderHeader from './create/OrderHeaderModel';
import CustomerInfo from './create/CustomerInfo';
import ShippingInfo from './create/ShippingInfo';
import PaymentMethod from './create/PaymentMethod';
import ProductList from './create/ProductList';
import PaymentSummary from './create/PaymentSummary';
import AdditionalInfo from './create/AdditionalInfo';
import '@/styles/createOder.css';
import ActionButtons from './create/ActionButtons';
import { generateOrderCode } from '../../utils/random.uitl';
import { Customer } from '@/features/customers/types/Customer';
import { useEffect, useMemo, useState } from 'react';
import { ProductOrder } from '@/features/products/types/ProductOrder';
import { DeliveryOrderInformation } from '../../types/DeliveryOrderInformation';
import { PaymentOrderInfo } from '@/features/payment/types/PaymentOrderInfo';
import { TotalPayment } from '../../types/TotalPayment';
import { useShippingManager } from '@/features/shipping/hook/useShippingManager';
import { AdditionalOrderInfo, OrderStatus } from '../../types/AdditionalOrderInfo';
import { useOrderManager } from '../../hook/useOrderManager';
import { useAuthManager } from '@/features/auth/hook/useAuthManager';
import { OrderFullInfo } from '../../types/Order';
import { useOrderItemManager } from '@/features/order-item/hook/useOrderItemManager';
import { useOrderStatusHistoryManager } from '@/features/order-status-history/hook/useOrderStatusHistoryManager';

type CreateOrderModalProps = {
    isOpen: boolean;
    isUpdate: boolean;
    orderInfo: OrderFullInfo | null;
    onClose: () => void;
};
export default function CreateOrderModal({ isOpen, isUpdate, orderInfo, onClose }: CreateOrderModalProps) {
    const { shippings } = useShippingManager();
    const { createOrder } = useOrderManager();
    const { auth } = useAuthManager();
    const { fetchOrderItems } = useOrderItemManager();
    const { fetchAllOrderStatusHistory } = useOrderStatusHistoryManager();

    // customer information
    const [customerInfo, setCustomerInfo] = useState<Customer | null>(null);
    const [isNewCustomer, setIsNewCustomer] = useState(false);

    // order product information
    const code = useMemo(() => generateOrderCode(), []);
    const [orderCode, setOrderCode] = useState(code);
    const [productOrders, setProductOrders] = useState<ProductOrder[]>([]);

    // delivery information
    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryOrderInformation | null>(null);

    // payment information
    const [paymentInfo, setPaymentInfo] = useState<PaymentOrderInfo | null>(null);

    // cost and payment
    const [totalPayment, setTotalPayment] = useState<TotalPayment>({
        prepayAmount: 0,
        vatInvoice: false,
    });

    const [additionalInfo, setAdditionalInfo] = useState<AdditionalOrderInfo>({
        orderStatus: OrderStatus.PENDING,
        notes: '',
    });

    // Calculator
    const shippingFee = useMemo(() => {
        if (!deliveryInfo) {
            return 0;
        }
        const shipping = shippings.find((shipping) => shipping.id === deliveryInfo.shippingUnitId);
        if (shipping) {
            return shipping.baseFee;
        }
        return 0;
    }, [deliveryInfo, shippings]);

    const subTotal = useMemo(() => {
        if (!productOrders.length) {
            return 0;
        }
        return productOrders.reduce((total, product) => total + product.price * product.quantity, 0);
    }, [productOrders]);

    // valid information
    const isValid = useMemo(() => {
        if (!customerInfo) {
            return false;
        }
        if (!productOrders.length) {
            return false;
        }
        if (!deliveryInfo) {
            return false;
        }
        if (!paymentInfo) {
            return false;
        }
        return true;
    }, [customerInfo, deliveryInfo, paymentInfo, productOrders.length]);

    // Case Update
    useEffect(() => {
        if (orderInfo) {
            setOrderCode(orderInfo.orderCode);
            setCustomerInfo(orderInfo.customer);
            setIsNewCustomer(false);
            setProductOrders(
                orderInfo.items.map((item) => ({
                    id: item.productId,
                    name: item.productName,
                    price: item.price,
                    quantityInStock: item.quantityInStock,
                    quantity: item.quantity,
                }))
            );

            setDeliveryInfo({
                shippingUnitId: orderInfo.shippingUnit.id,
                deliveryDate: orderInfo.deliveryDate,
                deliveredAt: orderInfo.deliveredAt,
                cancelledAt: orderInfo.cancelledAt,
            });

            setPaymentInfo({
                id: orderInfo.paymentMethod.id,
                paymentDays: orderInfo.paymentDays,
                bankName: orderInfo.bankAccount?.bankName ?? '',
                accountNumber: orderInfo.bankAccount?.accountNumber ?? '',
            });
            setTotalPayment({
                prepayAmount: orderInfo.prepaidAmount,
                vatInvoice: orderInfo.vatInvoice,
            });
            setAdditionalInfo({
                orderStatus: orderInfo.status,
                notes: orderInfo.note,
            });
        }
    }, [orderInfo]);

    if (!isOpen) return null;
    return (
        <div
            className='fixed inset-0 bg-gray-300 bg-opacity-70 flex items-center justify-center z-50'
            style={{ backgroundColor: 'rgba(156, 163, 175, 0.5)' }}
        >
            <div className='bg-white rounded-xl shadow-xl mx-10 w-full max-w-7xl max-h-[98vh] overflow-y-auto animate-slideIn'>
                <div className='bg-gray-50 py-6'>
                    <div className='max-w-7xl mx-auto px-4'>
                        <OrderHeader isUpdate={isUpdate} orderCode={orderCode} />
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                            <div className='space-y-6'>
                                <CustomerInfo
                                    customerInfo={customerInfo}
                                    onCustomerChange={(customer) => setCustomerInfo(customer)}
                                    onSwitchCustomerType={(type) => {
                                        setIsNewCustomer(type === 'new');
                                        setCustomerInfo(null);
                                    }}
                                />
                                <ShippingInfo deliveryInfo={deliveryInfo} setDeliveryInfo={setDeliveryInfo} />
                                <PaymentMethod paymentInfo={paymentInfo} setPaymentInfo={setPaymentInfo} />
                            </div>

                            <div className='space-y-6'>
                                <ProductList
                                    orderId={orderInfo?.id ?? null}
                                    isUpdate={isUpdate}
                                    products={productOrders}
                                    setProducts={setProductOrders}
                                />
                                <PaymentSummary
                                    shippingFee={shippingFee}
                                    subTotal={subTotal}
                                    totalPayment={totalPayment}
                                    setTotalPayment={setTotalPayment}
                                />
                                <AdditionalInfo
                                    orderId={orderCode}
                                    isUpdate={isUpdate}
                                    additionalInfo={additionalInfo}
                                    setAdditionalInfo={setAdditionalInfo}
                                />
                            </div>
                        </div>
                        <ActionButtons
                            isValid={isValid}
                            onCreate={() => {
                                createOrder({
                                    orderCode,
                                    customerInfo,
                                    isNewCustomer,
                                    productOrders,
                                    deliveryInfo,
                                    paymentInfo,
                                    totalPayment,
                                    additionalInfo,
                                    auth,
                                    shippingFee,
                                    subTotal,
                                })
                                    .then(() => {
                                        alert('Đơn hàng đã được tạo thành công!');
                                        fetchOrderItems();
                                        fetchAllOrderStatusHistory();
                                        onClose();
                                    })
                                    .catch((error) => {
                                        console.error('Error creating order:', error);
                                        alert('Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại sau.');
                                    });
                            }}
                            onCancel={() => {
                                onClose();
                                if (isUpdate) {
                                    fetchOrderItems();
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
