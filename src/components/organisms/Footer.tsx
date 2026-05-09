import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Logo from '../atoms/Logo';
import Text from '../atoms/Text';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".footer-content", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      }
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="pb-12 px-6 md:px-16 border-t border-[var(--glass-border)] bg-foreground/[0.01]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 footer-content">
        <Logo />
        <Text variant="span" className="text-foreground/30 text-sm font-medium tracking-tight">
          © 2026 BOTI Browser. All rights reserved.
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
