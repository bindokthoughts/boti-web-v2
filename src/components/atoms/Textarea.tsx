import React, { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`w-full px-4 py-3 bg-[rgba(20,40,50,0.5)] border border-[rgba(37,84,184,0.84)] text-white placeholder:text-white/50 focus:outline-none focus:border-[rgba(148,178,245,0.86)] transition-all duration-300 min-h-[120px] resize-y ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
