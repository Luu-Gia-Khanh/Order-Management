'use client';

import { Product } from '@/features/products/types/Product';
import { useMemo } from 'react';

type ProductSearchTableProps = {
    searchValue?: string;
    products: Product[];
    onSelectProduct: (product: Product) => void;
};
export default function ProductSearchTable({ searchValue, products, onSelectProduct }: ProductSearchTableProps) {
    const columns = [
        {
            key: 'id',
            name: 'Mã sản phẩm',
        },
        {
            key: 'name',
            name: 'Tên sản phẩm',
        },
        {
            key: 'price',
            name: 'Giá sản phẩm',
        },
        {
            key: 'stockQuantity',
            name: 'Số lượng',
        },
    ];

    const filteredProducts = useMemo(() => {
        if (!searchValue) return products;
        return products.filter(
            (product) =>
                product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                product.price.toString().includes(searchValue)
        );
    }, [searchValue, products]);

    if (filteredProducts.length === 0) {
        return (
            <div className='p-6 text-center text-gray-500'>
                <p>Không tìm thấy sản phẩm nào</p>
            </div>
        );
    }

    return (
        <div className='bg-white rounded-xl shadow-sm border border-gray-100'>
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead className='bg-gray-50'>
                        <tr>
                            {columns.map((column) => {
                                return (
                                    <th
                                        key={column.key}
                                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                        {column.name}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {filteredProducts.map((row) => (
                            <tr
                                key={row.id}
                                className='hover:bg-gray-50 cursor-pointer'
                                onClick={() => onSelectProduct(row)}
                            >
                                {columns.map((column) => {
                                    if (column.key === 'actions') {
                                        return (
                                            <td
                                                key={column.key}
                                                className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'
                                            >
                                                <div className='flex items-center justify-center space-x-2'>
                                                    <button
                                                        className='text-blue-600 hover:text-blue-900'
                                                        title='Xem chi tiết'
                                                    >
                                                        <span>Xem</span>
                                                    </button>
                                                    <button
                                                        className='text-green-600 hover:text-green-900'
                                                        title='Chỉnh sửa'
                                                    >
                                                        <span>Sửa</span>
                                                    </button>
                                                    <button
                                                        className='text-purple-600 hover:text-purple-900'
                                                        title='Nhân bản'
                                                    >
                                                        <span>Nhân bản</span>
                                                    </button>
                                                    <button className='text-red-600 hover:text-red-900' title='Xóa'>
                                                        <span>Xóa</span>
                                                    </button>
                                                </div>
                                            </td>
                                        );
                                    } else {
                                        const value = row[column.key as keyof typeof row];
                                        return (
                                            <td
                                                key={column.key}
                                                className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'
                                            >
                                                {value instanceof Date
                                                    ? value.toLocaleDateString() // hoặc toISOString(), format bạn muốn
                                                    : value || ''}
                                            </td>
                                        );
                                    }
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
