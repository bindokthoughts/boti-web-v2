import React, { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-3 bg-[rgba(20,40,50,0.5)] border border-[rgba(37,84,184,0.84)]  text-white placeholder:text-white/50 focus:outline-none focus:border-[rgba(148,178,245,0.86)] transition-all duration-300 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
export default Input;
