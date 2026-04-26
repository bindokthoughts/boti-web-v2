'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className = '', onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`nav-link inline-block ${
        isActive ? 'nav-link-active' : 'nav-link-inactive'
      } ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
