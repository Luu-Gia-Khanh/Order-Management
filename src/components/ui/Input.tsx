import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({ label, error, helperText, fullWidth = true, className = '', ...props }) => {
    const baseClasses =
        'px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors';
    const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300';
    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <div className={`${widthClass}`}>
            {label && (
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                    {label}
                    {props.required && <span className='text-red-500 ml-1'>*</span>}
                </label>
            )}

            <input className={`${baseClasses} ${errorClasses} ${widthClass} ${className} text-black`} {...props} />

            {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}

            {helperText && !error && <p className='mt-1 text-sm text-gray-500'>{helperText}</p>}
        </div>
    );
};

export default Input;
