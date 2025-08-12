// components/Loading.tsx
import React from 'react';

// Types definitions
export type LoadingSize = 'small' | 'medium' | 'large';
export type LoadingColor = 'blue' | 'green' | 'red' | 'purple';
export type InlineLoadingSize = 'sm' | 'lg';

export interface LoadingProps {
    size?: LoadingSize;
    text?: string;
    color?: LoadingColor;
}

export interface DotsLoadingProps {
    color?: LoadingColor;
}

export interface PageLoadingProps {
    text?: string;
}

export interface ButtonLoadingProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    loading: boolean;
}

export interface LinearLoadingProps {
    progress?: number;
}

export interface InlineLoadingProps {
    text?: string;
    size?: InlineLoadingSize;
}

// Main Loading Component
const Loading: React.FC<LoadingProps> = ({ size = 'medium', text = 'Đang tải...', color = 'blue' }) => {
    const sizeClasses: Record<LoadingSize, string> = {
        small: 'w-5 h-5 border-2',
        medium: 'w-8 h-8 border-4',
        large: 'w-12 h-12 border-4',
    };

    const colorClasses: Record<LoadingColor, string> = {
        blue: 'border-blue-500',
        green: 'border-green-500',
        red: 'border-red-500',
        purple: 'border-purple-500',
    };

    return (
        <div className='flex flex-col items-center justify-center p-4'>
            <div
                className={`animate-spin rounded-full border-gray-200 ${colorClasses[color]} ${sizeClasses[size]} border-t-current`}
            />
            {text && <p className='mt-3 text-sm text-gray-600 text-center'>{text}</p>}
        </div>
    );
};

// Loading component với dots
export const DotsLoading: React.FC<DotsLoadingProps> = ({ color = 'blue' }) => {
    const dotColors: Record<LoadingColor, string> = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        red: 'bg-red-500',
        purple: 'bg-purple-500',
    };

    return (
        <div className='flex items-center justify-center space-x-2 '>
            <div className={`w-2 h-2 ${dotColors[color]} rounded-full animate-bounce`} />
            <div
                className={`w-2 h-2 ${dotColors[color]} rounded-full animate-bounce`}
                style={{ animationDelay: '0.1s' }}
            />
            <div
                className={`w-2 h-2 ${dotColors[color]} rounded-full animate-bounce`}
                style={{ animationDelay: '0.2s' }}
            />
        </div>
    );
};

// Loading cho toàn trang
export const PageLoading: React.FC<PageLoadingProps> = ({ text = 'Đang tải trang...' }) => (
    <div className='fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50'>
        <div className='w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin' />
        <h3 className='mt-4 text-lg font-medium text-gray-700'>{text}</h3>
    </div>
);

// Loading component với pulse effect
export const PulseLoading: React.FC = () => (
    <div className='flex items-center justify-center p-4'>
        <div className='w-8 h-8 bg-blue-500 rounded-full animate-pulse' />
    </div>
);

// Skeleton loading
export const SkeletonLoading: React.FC = () => (
    <div className='animate-pulse p-4 max-w-md w-full'>
        <div className='h-6 bg-gray-300 rounded w-3/4 mb-4' />
        <div className='space-y-3'>
            <div className='h-4 bg-gray-300 rounded w-full' />
            <div className='h-4 bg-gray-300 rounded w-5/6' />
            <div className='h-4 bg-gray-300 rounded w-4/5' />
        </div>
    </div>
);

// Card skeleton loading
export const CardSkeleton: React.FC = () => (
    <div className='animate-pulse'>
        <div className='bg-gray-300 h-48 w-full rounded-t-lg' />
        <div className='p-4'>
            <div className='h-4 bg-gray-300 rounded w-3/4 mb-2' />
            <div className='h-4 bg-gray-300 rounded w-1/2' />
        </div>
    </div>
);

// Button loading
export const ButtonLoading: React.FC<ButtonLoadingProps> = ({ children, loading, className = '', ...props }) => (
    <button
        {...props}
        disabled={loading}
        className={`flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
        {loading && (
            <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
        )}
        {children}
    </button>
);

// Linear progress loading
export const LinearLoading: React.FC<LinearLoadingProps> = ({ progress = 0 }) => (
    <div className='w-full bg-gray-200 rounded-full h-2.5'>
        <div
            className='bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out'
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        />
    </div>
);

// Spinner với text bên cạnh
export const InlineLoading: React.FC<InlineLoadingProps> = ({ text = 'Đang xử lý...', size = 'sm' }) => {
    const spinnerSize = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';

    return (
        <div className='flex items-center space-x-2'>
            <div className={`${spinnerSize} border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin`} />
            <span className='text-sm text-gray-600'>{text}</span>
        </div>
    );
};

export default Loading;
