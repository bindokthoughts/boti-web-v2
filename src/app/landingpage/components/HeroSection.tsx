'use client';

import React, { forwardRef } from 'react';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Text from '@/components/atoms/Text';
import LogoTypo from '@/assets/images/Logo_Typo.svg';

interface HeroSectionProps {
  heroTextRef: React.RefObject<HTMLDivElement | null>;
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(({ heroTextRef }, ref) => {
  useGSAP(() => {
    gsap.to(".hero-bg-image", {
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  });

  return (
    <section ref={ref} className="hero-section min-h-[150vh] flex flex-col items-center justify-center relative px-6 py-32 overflow-hidden bg-background">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/images/hero-spatial.png"
          alt="Spatial Web Background"
          fill
          sizes="100vw"
          className="object-cover hero-bg-image"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center z-10">
        <div className="text-center space-y-8 hero-boti">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-primary/20 text-foreground/40 font-semibold text-xs tracking-[0.2em] uppercase bg-primary/[0.03] backdrop-blur-sm">
            <Sparkles size={14} className="text-primary" />
            A browser that's bigger on the inside.
          </div>
          <div ref={heroTextRef} className="flex justify-center mix-blend-difference w-[80vw] max-w-[800px] mx-auto">
            <Image
              src={LogoTypo}
              alt="BOTI"
              width={847}
              height={386}
              style={{ width: '100%', height: 'auto' }}
              className="object-contain pointer-events-none select-none"
              priority
            />
          </div>
          <div className="reveal-subtext">
            <Text variant="p" className="italic" opacity={0.3}>"It's pronounced BODHI"</Text>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
