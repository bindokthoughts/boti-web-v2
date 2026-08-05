import React, { SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', options, defaultValue, value, placeholder, ...props }, ref) => {
    const isControlled = value !== undefined;
    const selectProps: React.SelectHTMLAttributes<HTMLSelectElement> = {
      className: `w-full px-4 py-3 bg-[rgba(20,40,50,0.5)] border border-[rgba(37,84,184,0.84)] text-white placeholder:text-white/50 focus:outline-none focus:border-[rgba(148,178,245,0.86)] transition-all duration-300 appearance-none cursor-pointer ${className}`,
      ...props,
    };

    if (isControlled) {
      selectProps.value = value;
    } else {
      selectProps.defaultValue = defaultValue ?? '';
    }

    return (
      <div className="relative w-full">
        <select ref={ref} {...selectProps}>
          <option value="" disabled className="bg-slate-900 text-white">{placeholder || 'Select an option'}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
          </svg>
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
