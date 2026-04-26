import React from 'react';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  opacity?: number;
}

const Text: React.FC<TextProps> = ({ 
  children, 
  variant = 'p', 
  className = '', 
  opacity 
}) => {
  const Component = variant;
  
  const baseStyles = {
    h1: 'text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[0.9]',
    h2: 'text-4xl md:text-8xl font-bold tracking-tight leading-[0.9]',
    h3: 'text-4xl md:text-6xl font-bold tracking-tight',
    h4: 'text-3xl md:text-4xl font-bold tracking-tight',
    p: 'text-lg md:text-xl font-medium leading-relaxed',
    span: '',
  };

  const style = opacity ? { color: `rgb(var(--foreground-rgb) / ${opacity})` } : {};

  return (
    <Component 
      className={`${baseStyles[variant]} ${className}`}
      style={style}
    >
      {children}
    </Component>
  );
};

export default Text;
