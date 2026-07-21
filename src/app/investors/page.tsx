'use client';

import React, { useRef } from 'react';
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
      <div ref={containerRef} className="w-full min-h-screen flex items-center justify-start relative px-6 md:px-12 lg:px-24 overflow-hidden bg-background">
        {/* Background Layers with dark overlay for readability */}
        <div className="absolute inset-0 z-0">
          {/* Video Background */}
          <video
            src="/videos/bg_video_investorPage.webm"
            autoPlay
            // loop
            muted
            playsInline
            className="w-full h-full object-cover object-center bg-video-center"
          />

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
              The bridge to the future is here <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-extrabold">
                Let’s assemble it
              </span>
            </Text>
          </div>

          <div className="overflow-hidden">
            <Text variant="p" className="investors-reveal text-foreground/70 max-w-xl text-lg md:text-xl font-medium leading-relaxed">
              An immersive interface for a web that finally feels alive.
            </Text>
          </div>

          <div className="investors-reveal pt-4">
            <Button
              variant="primary"
              size="md"
              className="flex items-center gap-3"
              onClick={() => window.open('https://tinyurl.com/BOTI-Investor-Deck', '_blank')}
            >
              <span>View Pitch Deck</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div id="contact">
        <Contact />
      </div>
    </>
  );
}
