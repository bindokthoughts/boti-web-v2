'use client';

import React, { useRef } from 'react';
import { Smartphone } from 'lucide-react';
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
    src: '/videos/video_005.webm',
    type: 'video',
    title: 'Immersive Business Microverse',
    description: 'Provide your customers with an interactive 3D digital storefront they can walk and browse through.',
    objectPosition: 'left',
  },
  {
    id: '2',
    src: '/videos/video_005.webm',
    type: 'video',
    title: 'Unity-Powered Realism',
    description: 'Leverage native real-time game engine rendering directly in standard mobile and desktop browsers.',
    objectPosition: 'right',
  },
  {
    id: '3',
    src: '/images/image_004.webp',
    type: 'image',
    title: 'Sensory Customer Journeys',
    description: 'Transform flat, dull grids into playful spatial experiences that multiply engagement and scroll depth.',
    objectPosition: 'center',
  },
];

export default function BusinessPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out', duration: 1.2 }
    });

    // Elegant entrance animation timeline
    tl.from('.icon-badge', {
      scale: 0.6,
      opacity: 0,
      duration: 1,
    })
      .from('.quote-text', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
      }, '-=0.6')
      .from('.pill-badge', {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, '-=0.6')
      .from('.honeycomb-container', {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1.4,
      }, '-=1');

  }, { scope: containerRef });

  return (
    <>
      <div ref={containerRef} className="min-h-screen py-32 px-6 md:px-12 lg:px-24 flex items-center overflow-hidden relative">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 blur-[180px] rounded-full -z-10 pointer-events-none animate-pulse duration-10000" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center z-10">

          {/* Left Column: Icon, Impactful Quote and Badge */}
          <div className="lg:col-span-7 space-y-12 flex flex-col items-start text-left">
            <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_50px_rgba(0,70,255,0.2)] icon-badge">
              <Smartphone className="text-primary" size={40} strokeWidth={1.5} />
            </div>

            <Text variant="h2" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white drop-shadow-2xl quote-text">
              We play video games to escape. <br />
              <span className="text-primary/90 font-extrabold">Bring that experience to your business</span> <br />
              and it becomes alive and fun.
            </Text>

            {/* <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-primary/30 text-white font-normal text-lg tracking-widest bg-background/50 backdrop-blur-xl shadow-[0_0_30px_rgba(0,70,255,0.15)] pill-badge mt-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,70,255,0.8)]" />
              Built in Unity. Works on any device. No headset required.
            </div> */}
          </div>

          {/* Right Column: Honeycomb Grid Photo Cluster */}
          <div className="lg:col-span-5 w-full flex items-center justify-center honeycomb-container">
            <HoneycombGrid items={honeycombItems} rowsConfig={[2, 1]} gap={0} className="w-full max-w-[500px]" />
          </div>

        </div>
      </div>

      <div id="contact">
        <Contact />
      </div>
    </>
  );
}
