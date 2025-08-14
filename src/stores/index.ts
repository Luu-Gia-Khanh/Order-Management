import { devtools, persist } from 'zustand/middleware';
import { AuthState, createAuthSlice } from './auth.slice';
import { create } from 'zustand';
import { createCustomerSlice, CustomerState } from './customer.slice';
import { createProductSlice, ProductState } from './product.slice';
import { createShippingSlice, ShippingState } from './shipping.slice';
import { createPaymentSlice, PaymentState } from './payment.slice';
import { createOrderSlice, OrderState } from './other.slice';
import { BankAccountState, createBankAccountSlice } from './bankAccount.slice';
import { createOrderItemSlice, OrderItemState } from './orderItem.slice';
import { createOrderStatusHistorySlice, OrderStatusHistoryState } from './orderStatusHistory.slice';
import { createOrderPaymentSlice, OrderPaymentState } from './orderPayment.slice';

type StoreState = AuthState &
    CustomerState &
    ProductState &
    ShippingState &
    PaymentState &
    OrderState &
    BankAccountState &
    OrderItemState &
    OrderStatusHistoryState &
    OrderPaymentState;

export const useAppStore = create<StoreState>()(
    devtools(
        persist(
            (...a) => ({
                ...createAuthSlice(...a),
                ...createCustomerSlice(...a),
                ...createProductSlice(...a),
                ...createShippingSlice(...a),
                ...createPaymentSlice(...a),
                ...createOrderSlice(...a),
                ...createBankAccountSlice(...a),
                ...createOrderItemSlice(...a),
                ...createOrderStatusHistorySlice(...a),
                ...createOrderPaymentSlice(...a),
            }),
            {
                name: 'order-management-store',
                partialize: (state) => ({
                    token: state.token,
                }),
                onRehydrateStorage: () => (state, error) => {
                    if (!error) {
                        setTimeout(() => {
                            useAppStore.setState({ hydrated: true });
                        }, 0);
                    }
                },
            }
        )
    )
);
