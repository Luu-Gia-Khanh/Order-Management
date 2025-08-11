import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { InputSelect } from '@/components/ui/InputSelect';

export default function OrderFilters() {
    return (
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6'>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Từ ngày</label>
                    <input
                        type='date'
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Đến ngày</label>
                    <input
                        type='date'
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    />
                </div>
                <InputSelect
                    label={'Trạng thái'}
                    options={[
                        { value: 'name', label: 'Name' },
                        { value: 'date', label: 'Date' },
                        { value: 'price', label: 'Price' },
                    ]}
                />
                <Input label='Tìm Kiếm' placeholder='Mã đơn, tên khách hàng...' />
                <div className='flex items-end'>
                    <Button fullWidth>
                        <span>Lọc</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
