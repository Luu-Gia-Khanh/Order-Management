import { useState } from 'react';

export default function CreateOrderModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [productRows, setProductRows] = useState([{ id: 1 }]);

    const addProductRow = () => {
        setProductRows([...productRows, { id: Date.now() }]);
    };

    const removeProductRow = (id: number) => {
        setProductRows(productRows.filter((row) => row.id !== id));
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slideIn'>
                <div className='p-6 border-b border-gray-200'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-xl font-semibold text-gray-800'>Tạo đơn hàng mới</h3>
                        <button onClick={onClose} className='text-gray-400 hover:text-gray-600'>
                            <span>×</span>
                        </button>
                    </div>
                </div>
                <div className='p-6'>
                    <form className='space-y-6'>
                        {/* Form fields here */}
                        <div className='flex items-center justify-end space-x-3 pt-6 border-t border-gray-200'>
                            <button
                                type='button'
                                onClick={onClose}
                                className='px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
                            >
                                Hủy
                            </button>
                            <button
                                type='button'
                                className='px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors'
                            >
                                Lưu nháp
                            </button>
                            <button
                                type='submit'
                                className='px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors'
                            >
                                Tạo đơn hàng
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
