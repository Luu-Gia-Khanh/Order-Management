import { Description, Field, Label, Select as HeadlessSelect } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectProps {
    label?: string;
    description?: string;
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    fullWidth?: boolean;
    name?: string;
    id?: string;
}

export function InputSelect({
    label,
    description,
    options,
    value,
    onChange,
    className = '',
    disabled = false,
    required = false,
    placeholder,
    fullWidth = true,
    name,
    id,
}: SelectProps) {
    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <Field className={clsx(widthClass, className)}>
            {label && (
                <Label className={'block text-sm font-medium text-gray-700 mb-2'}>
                    {label}
                    {required && <span className='text-red-500 ml-1'>*</span>}
                </Label>
            )}

            {description && <Description className='text-sm/6'>{description}</Description>}

            <div className='relative'>
                <HeadlessSelect
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    disabled={disabled}
                    name={name}
                    id={id}
                    className={clsx(
                        'block appearance-none rounded-lg px-3 py-2 text-sm/6',
                        'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 ',
                        'disabled:opacity-50 disabled:cursor-not-allowed border-1 border-gray-300',
                        widthClass,
                        // Make the text of each option black on Windows
                        '*:text-black'
                    )}
                >
                    {placeholder && (
                        <option value='' disabled hidden>
                            {placeholder}
                        </option>
                    )}

                    {options.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.disabled}>
                            {option.label}
                        </option>
                    ))}
                </HeadlessSelect>

                <ChevronDownIcon
                    className={clsx(
                        'pointer-events-none absolute top-2.5 right-2.5 size-4',
                        disabled ? 'opacity-50' : ''
                    )}
                    aria-hidden='true'
                />
            </div>
        </Field>
    );
}
