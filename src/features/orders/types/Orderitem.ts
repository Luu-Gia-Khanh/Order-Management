export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    subtotal: number;
    note: string;
    createdAt: Date;
}
