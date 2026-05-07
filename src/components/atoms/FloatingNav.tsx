'use client';

import React, { useEffect, useState } from 'react';

export interface FloatingNavProps {
  sections: {
    id: string;
    label: string;
  }[];
}

export default function FloatingNav({ sections }: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

  useEffect(() => {
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -40% 0px',
      threshold: 0.1, // Trigger as soon as 10% is visible
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the most visible section
      let maxRatio = 0;
      let mostVisibleId = '';

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisibleId = entry.target.id;
        }
      });

      if (mostVisibleId) {
        setActiveSection(mostVisibleId);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className={`group relative flex items-center justify-end w-8 h-8 rounded-full transition-all duration-300 ${activeSection === id ? 'opacity-100' : 'opacity-40 hover:opacity-100'
            }`}
          aria-label={`Scroll to ${label}`}
        >
          <span className="absolute right-10 px-2 py-1 rounded bg-background/80 backdrop-blur-sm text-xs font-medium border border-[var(--glass-border)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap text-foreground">
            {label}
          </span>
          <div
            className={`transition-all duration-300 ${activeSection === id ? 'scale-110 drop-shadow-[0_0_6px_rgba(var(--primary),0.8)]' : ''}`}
          >
            <div
              className={`transition-all duration-300 bg-slate-300 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] ${activeSection === id ? 'w-3 h-3' : 'w-2 h-2'}`}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
