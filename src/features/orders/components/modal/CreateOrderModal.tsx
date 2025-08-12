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
import { useMemo, useState } from 'react';
import { ProductOrder } from '@/features/products/types/ProductOrder';
import { DeliveryOrderInformation } from '../../types/DeliveryOrderInformation';
import { PaymentOrderInfo } from '@/features/payment/types/PaymentOrderInfo';
import { TotalPayment } from '../../types/TotalPayment';
import { useShippingManager } from '@/features/shipping/hook/useShippingManager';
import { AdditionalOrderInfo, OrderStatus } from '../../types/AdditionalOrderInfo';

export default function CreateOrderModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { shippings } = useShippingManager();
    // customer information
    const [customerInfo, setCustomerInfo] = useState<Customer | null>(null);
    const [isNewCustomer, setIsNewCustomer] = useState(false);

    // order product information
    const orderCode = useMemo(() => generateOrderCode(), []);
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

    if (!isOpen) return null;
    return (
        <div
            className='fixed inset-0 bg-gray-300 bg-opacity-70 flex items-center justify-center z-50'
            style={{ backgroundColor: 'rgba(156, 163, 175, 0.5)' }}
        >
            <div className='bg-white rounded-xl shadow-xl mx-10 w-full max-w-7xl max-h-[98vh] overflow-y-auto animate-slideIn'>
                <div className='bg-gray-50 py-6'>
                    <div className='max-w-7xl mx-auto px-4'>
                        <OrderHeader orderCode={orderCode} />
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
                                <ProductList products={productOrders} setProducts={setProductOrders} />
                                <PaymentSummary
                                    shippingFee={shippingFee}
                                    subTotal={subTotal}
                                    totalPayment={totalPayment}
                                    setTotalPayment={setTotalPayment}
                                />
                                <AdditionalInfo additionalInfo={additionalInfo} setAdditionalInfo={setAdditionalInfo} />
                            </div>
                        </div>
                        <ActionButtons
                            onCreate={() => {
                                console.log(
                                    'Order created with customer:',
                                    customerInfo,
                                    'Is new customer:',
                                    isNewCustomer,
                                    'Product orders:',
                                    productOrders,
                                    'Delivery information:',
                                    deliveryInfo,
                                    'Payment information:',
                                    paymentInfo,
                                    'Total payment:',
                                    totalPayment,
                                    'Additional information:',
                                    additionalInfo
                                );
                            }}
                            onCancel={onClose}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
