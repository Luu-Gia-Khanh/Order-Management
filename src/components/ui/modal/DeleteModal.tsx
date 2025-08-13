import Button from '@/components/ui/Button';
export default function DeleteModal({
    isOpen,
    onClose,
    onDelete,
}: {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}) {
    if (!isOpen) return null;

    return (
        <div
            className='fixed inset-0 bg-gray-300 bg-opacity-70 flex items-center justify-center z-50'
            style={{ backgroundColor: 'rgba(156, 163, 175, 0.5)' }}
            onClick={onClose}
        >
            <div
                className='bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slideIn'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='p-6'>
                    <div className='flex flex-col space-y-4 py-5'>
                        <h2 className='text-center text-xl font-medium'>Bạn có chắc chắn muốn xoá không ?</h2>
                    </div>
                    <div className='flex items-center justify-end space-x-3 pt-6'>
                        <Button variant={'secondary'} onClick={onClose}>
                            Huỷ
                        </Button>
                        <Button className='bg-red-600 hover:bg-red-700' onClick={onDelete}>
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
