'use client';

import React, { useRef } from 'react';
import Text from '@/components/atoms/Text';
import HoneycombGrid, { HoneycombItem } from '@/components/molecules/HoneycombGrid';
import Contact from '@/components/organisms/Contact';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const honeycombItems: HoneycombItem[] = [
  {
    id: '1',
    src: '/videos/video_001.mp4',
    type: 'video',
    title: 'Minimalist Spatial Shelf',
    description: 'A cozy 3D spatial setup displaying luxury products. Lighting, depth, and shadow create a tactile, real-world shopping experience.',
  },
  {
    id: '2',
    src: '/images/image_001.jpeg',
    type: 'image',
    title: 'Botanical Walkthrough',
    description: 'Walk through a digital greenhouse with stone paths and climbing ivy. Experiences feel organic and alive.',
  },
  {
    id: '3',
    src: '/videos/video_002.mp4',
    type: 'video',
    title: 'Interactive Boutique',
    description: 'Items on shelves come to life. Interact directly instead of scrolling through long flat list pages.',
  },
  {
    id: '4',
    src: '/videos/video_003.mp4',
    type: 'video',
    title: 'Luminous Wellness Studio',
    description: 'Natural design materials bathed in warm atmospheric lighting. Spatial spaces enhance user engagement and retention.',
  },
  {
    id: '5',
    src: '/videos/video_003.mp4',
    type: 'video',
    title: 'Artisanal Pottery Showroom',
    description: 'Exquisite physical crafts displayed in a virtual studio gallery, bringing sensory richness directly to the browser.',
  },
];

export default function EcosystemPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out', duration: 1.2 }
    });

    // Smooth entry animation timeline
    tl.from('.feature-card', {
      y: 80,
      opacity: 0,
      stagger: 0.1,
    })
      .from('.reveal-subtext-item', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
      }, '-=0.8')
      .from('.honeycomb-container', {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1.4,
      }, '-=1')
      .from('.stats-container', {
        y: 80,
        opacity: 0,
        duration: 1.2,
      }, '-=0.8');

  }, { scope: containerRef });

  return (
    <>
      <div ref={containerRef} className="min-h-screen py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 blur-[180px] rounded-full -z-10 pointer-events-none animate-pulse duration-10000" />

        <div className="max-w-7xl mx-auto space-y-24 z-10 relative">
          
          {/* Top Section: Split layout with Problem Statement (Left) and Honeycomb Grid (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left Column: Problem Text */}
            <div className="lg:col-span-6 space-y-12">
              <div className="space-y-4 feature-grid">
                <div className="overflow-hidden">
                  <Text variant="h2" className="feature-card text-white">
                    Most websites look flat, and that’s boring.
                  </Text>
                </div>
              </div>

              <div className="space-y-6 reveal-subtext">
                <Text opacity={0.6} className="text-xl md:text-2xl reveal-subtext-item leading-relaxed">
                  Microdoses of information and entertainment have become the norm. If something doesn’t grab our attention right away, we move on and forget about it.
                </Text>
                <div className="pt-4 reveal-subtext-item">
                  <Text variant="h4" className="text-foreground/80">
                    A dynamic website is critical. VR is gaining popularity and websites need to keep up to stay relevant.
                  </Text>
                </div>
              </div>
            </div>

            {/* Right Column: Honeycomb Grid Showcase */}
            <div className="lg:col-span-6 w-full flex items-center justify-center honeycomb-container">
              <HoneycombGrid items={honeycombItems} rowsConfig={[3, 2]} gap={0} className="w-full max-w-[680px]" />
            </div>

          </div>

          {/* Bottom Section: Centered Showcase Stats Card */}
          <div className="max-w-4xl mx-auto stats-container">
            <div className="stat-card backdrop-blur-[2px] shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] rounded-[2rem] p-8 md:p-12 space-y-8 border border-white/10 transition-all duration-500 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] hover:border-white/30 bg-primary/[0.02]">
              <Text variant="p" className="text-sm font-bold uppercase tracking-widest text-center" opacity={0.6}>
                The Flat Web Is Losing Us:
              </Text>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="space-y-2 text-center md:border-r border-foreground/10 pr-0 md:pr-8">
                  <h2 className="text-5xl md:text-7xl font-bold drop-shadow-lg text-foreground">
                    91<span className="text-primary">%</span>
                  </h2>
                  <Text className="font-bold uppercase text-sm tracking-widest" opacity={0.6}>
                    Bounce rate
                  </Text>
                </div>
                
                <div className="space-y-2 text-center">
                  <h2 className="text-5xl md:text-7xl font-bold drop-shadow-lg text-foreground">
                    1.4<span className="text-primary">%</span>
                  </h2>
                  <Text variant="p" className="font-bold uppercase text-sm tracking-widest" opacity={0.6}>
                    Avg. scroll depth
                  </Text>
                </div>
              </div>

              <div className="pt-6 border-t border-foreground/10 text-center">
                <Text variant="p" className="font-extrabold uppercase text-sm tracking-widest text-primary drop-shadow-sm">
                  2x-4x Higher conversion in immersive formats
                </Text>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div id="contact">
        <Contact />
      </div>
    </>
  );
}
