'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import Contact from '@/components/organisms/Contact';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InvestorsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bgType, setBgType] = useState<'image' | 'video'>('image');

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out', duration: 1.2 }
    });

    tl.from('.investors-reveal', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <>
      <div ref={containerRef} className="min-h-screen flex items-center justify-start relative px-6 md:px-12 lg:px-24 overflow-hidden bg-background">
        {/* Background Layers with dark overlay for readability */}
        <div className="absolute inset-0 z-0">
          {/* Image Background */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${bgType === 'image' ? 'opacity-100' : 'opacity-0'}`}>
            <Image
              src="/images/bg_image_investorPage.webp"
              alt="Investor Background"
              fill
              sizes="100vw"
              className="object-cover animate-zoom-pan"
              priority
            />
          </div>

          {/* Video Background */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${bgType === 'video' ? 'opacity-100' : 'opacity-0'}`}>
            <video
              src="/videos/bg_video_investorPage.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Core overlays for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        </div>

        {/* Content Container */}
        <div className="max-w-4xl w-full z-10 flex flex-col items-start text-left space-y-8 pt-20">
          <div className="overflow-hidden">
            <Text className="investors-reveal text-primary font-bold uppercase tracking-widest text-xs md:text-sm">
              Simulated Systems Inc.
            </Text>
          </div>

          <div className="overflow-hidden">
            <Text variant="h1" className="investors-reveal text-white text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Step inside the next<br />
              evolution of the web.
            </Text>
          </div>

          <div className="overflow-hidden">
            <Text variant="p" className="investors-reveal text-foreground/70 max-w-xl text-lg md:text-xl font-medium leading-relaxed">
              An immersive interface for a web that finally feels alive.
            </Text>
          </div>

          <div className="investors-reveal pt-4">
            <Button variant="primary" size="md" className="flex items-center gap-3">
              <span>View Investor Deck</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-24 z-10 overflow-hidden">
          <Text className="investors-reveal text-xs md:text-sm font-medium tracking-wide text-foreground/40">
            Pre-Seed <span className="mx-2 text-primary">•</span> Investor Materials
          </Text>
        </div>

        {/* Sleek Glassmorphic Background Toggle switch */}
        <div className="absolute bottom-12 right-6 md:right-12 lg:right-24 z-20 flex bg-foreground/5 backdrop-blur-md border border-[var(--glass-border)] rounded-full p-1 text-xs md:text-sm font-semibold tracking-wider uppercase">
          <button
            onClick={() => setBgType('image')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              bgType === 'image'
                ? 'bg-primary text-white shadow-[0_0_15px_rgba(0,70,255,0.4)]'
                : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
            }`}
          >
            BG Image
          </button>
          <button
            onClick={() => setBgType('video')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              bgType === 'video'
                ? 'bg-primary text-white shadow-[0_0_15px_rgba(0,70,255,0.4)]'
                : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
            }`}
          >
            BG Video
          </button>
        </div>
      </div>

      <div id="contact">
        <Contact />
      </div>
    </>
  );
}
