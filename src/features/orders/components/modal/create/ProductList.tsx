import { Product } from '@/features/products/types/Product';
import React, { useMemo, useState } from 'react';
import { IoStorefrontSharp } from 'react-icons/io5';
import ChooseProductModal from './product/ChooseProductModal';
import { formatCurrency } from '@/utils/currency.util';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { ProductOrder } from '@/features/products/types/ProductOrder';
import { useOrderItemManager } from '@/features/order-item/hook/useOrderItemManager';
import { FaCartPlus } from 'react-icons/fa';

type ProductListProps = {
    orderId: string | null;
    isUpdate: boolean;
    products: ProductOrder[];
    setProducts: React.Dispatch<React.SetStateAction<ProductOrder[]>>;
};
const ProductList = ({ isUpdate, orderId, products, setProducts }: ProductListProps) => {
    const { deleteOrderItem, getOrderItemByOrderIdAndProductId } = useOrderItemManager();
    const [isOpen, setOpen] = useState(false);
    const updateProduct = (id: string, field: keyof ProductOrder, value: number) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => (product.id === id ? { ...product, [field]: value } : product))
        );
    };
    const handleAddProduct = (product: Product) => {
        const existingProduct = products.find((p) => p.id === product.id);
        if (existingProduct) {
            if (existingProduct.quantity + 1 >= existingProduct.quantityInStock) {
                alert('Số lượng sản phẩm đã đạt giới hạn trong kho');
                return;
            }
            updateProduct(product.id, 'quantity', existingProduct.quantity + 1);
            return;
        }
        setProducts((prev) => [
            ...prev,
            {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                quantityInStock: product.stockQuantity,
            },
        ]);
    };
    const removeProduct = (id: string) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };
    const productTotal = useMemo(() => {
        return products.reduce((total, product) => total + product.price * product.quantity, 0);
    }, [products]);

    return (
        <div className='section-card p-6'>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center'>
                    <IoStorefrontSharp className='fas fa-box text-orange-600 text-xl mr-3'></IoStorefrontSharp>
                    <h2 className='text-xl font-semibold text-gray-900'>Sản phẩm</h2>
                </div>
                <button
                    onClick={() => setOpen(true)}
                    className='btn-primary text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors hover:bg-blue-700'
                >
                    <FaCartPlus className='mr-2'></FaCartPlus>Thêm sản phẩm
                </button>
            </div>
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead>
                        <tr className='border-b border-gray-200'>
                            <th className='text-left py-3 text-sm font-medium text-gray-700'>Tên sản phẩm</th>
                            <th className='text-left py-3 text-sm font-medium text-gray-700'>Giá bán</th>
                            <th className='text-left py-3 text-sm font-medium text-gray-700'>Số lượng</th>
                            <th className='text-center py-3 text-sm font-medium text-gray-700'>Thành tiền</th>
                            <th className='w-10'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className='text-gray-500 pt-3 text-center'>
                                    Chưa có sản phẩm nào trong đơn hàng. Vui lòng thêm sản phẩm.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className='product-row py-3'>
                                    <td className='py-3'>
                                        <span className='text-sm font-medium text-gray-700'>{product.name}</span>
                                    </td>
                                    <td className='py-3'>
                                        <span className='text-sm font-medium text-gray-700'>
                                            {formatCurrency(product.price)}
                                        </span>
                                    </td>
                                    <td className='py-3'>
                                        <input
                                            type='number'
                                            placeholder='1'
                                            value={product.quantity}
                                            className='form-input w-16 p-2 text-sm text-center'
                                            min='1'
                                            max={product.quantityInStock}
                                            onChange={(e) => {
                                                if (parseInt(e.target.value) > product.quantityInStock) {
                                                    e.target.value = product.quantityInStock.toString();
                                                }
                                                updateProduct(product.id, 'quantity', parseInt(e.target.value) || 1);
                                            }}
                                        />
                                    </td>
                                    <td className='py-3 text-left font-medium text-gray-900'>
                                        <span className='text-sm font-medium text-gray-700'>
                                            {formatCurrency(product.price * product.quantity)}
                                        </span>
                                    </td>
                                    <td className='py-3'>
                                        <button
                                            onClick={() => {
                                                removeProduct(product.id);
                                                if (isUpdate) {
                                                    const orderItem = getOrderItemByOrderIdAndProductId(
                                                        orderId ?? '',
                                                        product.id
                                                    );
                                                    deleteOrderItem(orderItem?.id ?? '');
                                                }
                                            }}
                                            className='text-red-500 hover:text-red-700 cursor-pointer  flex justify-center items-center'
                                        >
                                            <BiSolidTrashAlt className='fas fa-trash text-sm'></BiSolidTrashAlt>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className='border-t border-gray-200 pt-4 mt-4'>
                <div className='flex justify-between items-center'>
                    <span className='text-lg font-semibold text-gray-900'>Tổng tiền sản phẩm:</span>
                    <span className='text-xl font-bold text-blue-600'>{formatCurrency(productTotal)}</span>
                </div>
            </div>
            {isOpen && (
                <ChooseProductModal isOpen={isOpen} onClose={() => setOpen(false)} onSelectProduct={handleAddProduct} />
            )}
        </div>
    );
};

export default ProductList;
