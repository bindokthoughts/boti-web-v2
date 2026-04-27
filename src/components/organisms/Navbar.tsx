'use client';

import React, { useState, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Logo from '../atoms/Logo';
import NavLink from '../molecules/NavLink';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Ecosystem', path: '/ecosystem' },
    { name: 'Business', path: '/business' },
    { name: 'Team', path: '/team' },
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useGSAP(() => {
    const links = gsap.utils.toArray('.nav-link') as HTMLElement[];

    links.forEach(link => {
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = link.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        gsap.to(link, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.4,
          ease: "power2.out"
        });
      };

      const onMouseLeave = () => {
        gsap.to(link, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)"
        });
      };

      link.addEventListener('mousemove', onMouseMove);
      link.addEventListener('mouseleave', onMouseLeave);

      return () => {
        link.removeEventListener('mousemove', onMouseMove);
        link.removeEventListener('mouseleave', onMouseLeave);
      };
    });
  }, { scope: navContainerRef });

  // Mobile Menu Animation
  useGSAP(() => {
    if (isMenuOpen) {
      gsap.to(menuOverlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.fromTo(".mobile-nav-link",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "expo.out", delay: 0.2 }
      );
    } else {
      gsap.to(menuOverlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power2.in"
      });
    }
  }, [isMenuOpen]);

  return (
    <nav
      ref={navContainerRef}
      className={`fixed top-0 left-0 w-full z-[100] px-6 md:px-16 py-8 flex justify-between items-center transition-all duration-500 ${isMenuOpen ? 'bg-transparent' : 'backdrop-blur-md bg-background/60'
        }`}
    >
      <Logo />

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-12 items-center">
        {navItems.map((item) => (
          <NavLink key={item.path} href={item.path}>
            {item.name}
          </NavLink>
        ))}

        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-[var(--glass-border)] hover:bg-foreground/5 transition-all ml-4"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun size={16} className="text-primary" /> : <Moon size={16} className="text-primary" />}
        </button>
      </div>

      {/* Mobile Nav Trigger */}
      <div className="flex items-center gap-4 md:hidden">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-[var(--glass-border)]"
        >
          {isDarkMode ? <Sun size={18} className="text-primary" /> : <Moon size={18} className="text-primary" />}
        </button>
        <button
          className="text-foreground p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        ref={menuOverlayRef}
        style={{ opacity: 0, pointerEvents: "none" }}
        className="fixed top-0 left-0 w-full h-full z-[90] glass-overlay flex flex-col items-center justify-between p-8 pt-32 pb-16 md:hidden"
      >
        <div className="flex flex-col items-center gap-8 w-full">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              href={item.path}
              className="mobile-nav-link text-5xl font-bold tracking-tighter"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Secondary Mobile Footer */}
        {/* <div className="mobile-nav-link flex flex-col items-center gap-6 opacity-60">
          <div className="w-12 h-[1px] bg-foreground/20" />
          <div className="flex gap-8 text-sm font-medium uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">Github</a>
          </div>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
