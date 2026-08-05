import React from 'react';
import { motion } from 'framer-motion';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled,
  ...props
}) => {
  const variants = {
    primary: 'bg-primary text-white shadow-[0_0_20px_rgba(0,70,255,0.3)] hover:shadow-[0_0_30px_rgba(0,70,255,0.5)]',
    outline: 'border border-[var(--glass-border)] bg-foreground/[0.03] text-foreground hover:bg-foreground/[0.05]',
    ghost: 'text-foreground hover:bg-foreground/[0.05]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-8 py-4 text-sm',
    lg: 'px-12 py-5 text-base',
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`rounded-full font-bold uppercase tracking-widest transition-all ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
