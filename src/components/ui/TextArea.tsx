import React from 'react';

interface BaseTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export default function TextArea({ label, error, className = '', ...props }: BaseTextAreaProps) {
    return (
        <div className='flex flex-col space-y-1'>
            {label && <label className='text-sm font-medium text-gray-700'>{label}</label>}

            <textarea
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors 
          ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
                {...props}
            />

            {error && <span className='text-sm text-red-500'>{error}</span>}
        </div>
    );
}
