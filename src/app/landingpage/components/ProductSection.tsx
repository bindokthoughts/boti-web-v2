'use client';

import React, { useRef } from 'react';
import Text from '@/components/atoms/Text';
import HoneycombGrid, { HoneycombItem } from '@/components/molecules/HoneycombGrid';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const honeycombItems: HoneycombItem[] = [
  {
    id: '1',
    src: '/images/honeycomb-1.png',
    type: 'image',
    title: 'Minimalist Spatial Shelf',
    description: 'A cozy 3D spatial setup displaying luxury products. Lighting, depth, and shadow create a tactile, real-world shopping experience.',
  },
  {
    id: '2',
    src: '/images/honeycomb-2.png',
    type: 'image',
    title: 'Botanical Walkthrough',
    description: 'Walk through a digital greenhouse with stone paths and climbing ivy. Experiences feel organic and alive.',
  },
  {
    id: '3',
    src: '/images/honeycomb-3.png',
    type: 'image',
    title: 'Interactive Boutique',
    description: 'Items on shelves come to life. Interact directly instead of scrolling through long flat list pages.',
  },
  {
    id: '4',
    src: '/images/honeycomb-2.png', // Reuse honeycomb-2 as instructed to avoid extra generation
    type: 'image',
    title: 'Luminous Wellness Studio',
    description: 'Natural design materials bathed in warm atmospheric lighting. Spatial spaces enhance user engagement and retention.',
  },
  {
    id: '5',
    src: '/images/honeycomb-3.png', // Reuse honeycomb-3 as instructed
    type: 'image',
    title: 'Artisanal Pottery Showroom',
    description: 'Exquisite physical crafts displayed in a virtual studio gallery, bringing sensory richness directly to the browser.',
  },
];

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
      // Honeycomb Grid fade in & slide up
      .from('.honeycomb-container', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      }, '-=0.6')
      // Dramatic emphasis on "Step inside the web."
      .from('.step-inside', {
        scale: 4,
        opacity: 0,
        y: 30,
        duration: 1.5,
        ease: 'expo.out',
      }, '-=0.6');
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="min-h-screen py-32 px-6 md:px-12 lg:px-24 flex items-center overflow-hidden relative">

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 blur-[180px] rounded-full -z-10 pointer-events-none animate-pulse duration-10000" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center z-10">

        {/* Left Column: Content */}
        <div className="lg:col-span-5 space-y-12">
          <div className="overflow-hidden">
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.95] feature-card text-white">
              BOTI is the first browser that transforms 2D websites into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-extrabold">3D experiences.</span>
            </h3>
          </div>

          <div className="flex flex-col gap-8 reveal-subtext">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-medium reveal-subtext-item text-foreground/80">
                You walk, look, and interact instead of scrolling.
              </h3>
              <h3 className="text-xl md:text-2xl font-medium reveal-subtext-item text-foreground/80">
                Items on your page come to life, with shadows and depth.
              </h3>
            </div>

            <div className="mt-8 pt-4">
              <h2 className="text-4xl md:text-7xl lg:text-8xl text-primary font-extrabold step-inside drop-shadow-2xl">
                Step inside the web.
              </h2>
            </div>
          </div>
        </div>

        {/* Right Column: Honeycomb Grid Showcase */}
        <div className="lg:col-span-7 w-full flex items-center justify-center honeycomb-container">
          <HoneycombGrid items={honeycombItems} rowsConfig={[3, 2]} gap={0} className="w-full max-w-[680px]" />
        </div>

      </div>
    </section>
  );
};

export default ProductSection;

