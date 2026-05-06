import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LogoTypo from '@/assets/images/Logo_Typo.svg';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <Link href="/" className={`flex items-center group ${className}`}>
      <Image
        src={LogoTypo}
        alt="BOTI Logo"
        width={70}
        height={32}
        // style={{ width: 'auto', height: 'auto' }}
        className="h-8 transition-opacity duration-300 group-hover:opacity-80"
        priority
      />
    </Link>
  );
};

export default Logo;
