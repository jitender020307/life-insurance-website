'use client';

import { forwardRef, InputHTMLAttributes, LabelHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-secondary-700 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-lg border bg-white px-4 py-3 text-secondary-900 placeholder-secondary-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:bg-secondary-50 disabled:cursor-not-allowed',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-secondary-300 hover:border-secondary-400 focus:border-primary-500'
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-secondary-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('block text-sm font-medium text-secondary-700 mb-1.5', className)}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
    </label>
  )
);

Label.displayName = 'Label';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-secondary-700 mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-lg border bg-white px-4 py-3 text-secondary-900 placeholder-secondary-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-y min-h-[100px] disabled:bg-secondary-50 disabled:cursor-not-allowed',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-secondary-300 hover:border-secondary-400 focus:border-primary-500'
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-secondary-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, id, options, placeholder, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-secondary-700 mb-1.5">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-lg border bg-white px-4 py-3 text-secondary-900 placeholder-secondary-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 appearance-none bg-[url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")] bg-[length:1.5rem_1.5rem] bg-[right_0.5rem_center] bg-no-repeat pr-10 disabled:bg-secondary-50 disabled:cursor-not-allowed',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-secondary-300 hover:border-secondary-400 focus:border-primary-500'
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-secondary-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
