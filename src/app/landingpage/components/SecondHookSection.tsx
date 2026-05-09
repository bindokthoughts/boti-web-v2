'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Text from '@/components/atoms/Text';

const SecondHookSection: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".reveal-bottom", {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="min-h-screen flex flex-col justify-center px-6 md:px-24 py-32 overflow-hidden">
      <div className="w-full">
        {/* Bottom Section: Reversal */}
        <div className="space-y-8 max-w-4xl">
          <div className="space-y-2 overflow-hidden">
            <div className="overflow-hidden reveal-bottom">
              <Text variant="h2" className="text-primary">
                The Web Froze.
              </Text>
            </div>
            <div className="overflow-hidden reveal-bottom">
              <Text variant="h2" className="text-foreground">
                The World Moved On.
              </Text>
            </div>
          </div>
          <div className="overflow-hidden reveal-bottom">
            <Text variant="p" opacity={0.4} className="italic max-w-2xl">
              Tech, culture, and behavior already crossed over. We live spatially now.
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondHookSection;
