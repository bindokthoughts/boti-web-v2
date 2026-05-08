'use client';

import React, { useRef } from 'react';
import Text from '@/components/atoms/Text';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ProductSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom 80%',
        toggleActions: 'play none none reverse',
      }
    });

    // Title animation
    tl.from('.feature-card', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    })
      // Subtext animation
      .from('.reveal-subtext-item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      }, '-=0.5')
      // Dramatic emphasis on "Step inside the web."
      .from('.step-inside', {
        scale: 4,
        opacity: 0,
        y: 30,
        duration: 1.5,
        ease: 'expo.out',
      }, '-=0.4');
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="min-h-screen py-32 px-6 md:px-24 flex items-center feature-grid overflow-hidden">
      <div className="max-w-5xl space-y-12">
        <div className="overflow-hidden">
          <h3 className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.9] feature-card">
            BOTI is the first browser that transforms 2D websites into <br />
            <Text variant="span" className="text-primary">3D experiences.</Text>
          </h3>
        </div>
        <div className="flex flex-col gap-8 reveal-subtext">
          <div className="space-y-4">
            <Text opacity={0.6} className="text-4xl md:text-2xl font-medium reveal-subtext-item">
              You walk, look, and interact instead of scrolling.
            </Text>
            <Text opacity={0.6} className="text-4xl md:text-2xl font-medium reveal-subtext-item">
              Items on your page come to life, with shadows and depth.
            </Text>
          </div>
          <div className="mt-8 pt-4">
            <h2 className="text-5xl md:text-8xl text-primary font-extrabold step-inside drop-shadow-2xl">
              Step inside the web.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
