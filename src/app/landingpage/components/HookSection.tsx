'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Text from '@/components/atoms/Text';

const HookSection: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const title1 = useRef<HTMLDivElement>(null);
  const title2 = useRef<HTMLDivElement>(null);
  const subtextItems = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power4.out", duration: 1.2 }
    });

    // Animate Titles
    tl.from([title1.current, title2.current], {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      skewY: 7,
      duration: 1.5,
    })
    // Animate Subtext items
    .from(subtextItems.current, {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
    }, "-=0.8");

  }, { scope: container });

  return (
    <section ref={container} className="min-h-screen flex flex-col justify-center px-6 md:px-24 py-32 overflow-hidden">
      <div className="w-full space-y-24">
        {/* Top Section: Main Hook */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-24">
          <div className="w-full lg:w-1/2 overflow-hidden">
            <div className="overflow-hidden">
              <div ref={title1}>
                <Text variant="h1">
                  We rebuilt the browser
                </Text>
              </div>
            </div>
            <div className="overflow-hidden">
              <div ref={title2}>
                <Text variant="h1" opacity={0.3}>
                  for the world the web became.
                </Text>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="space-y-4">
              {[
                "From scroll to spatial.",
                "Any flat site becomes a 3D space you can step inside.",
                "Right in your browser.",
                "Step inside the web."
              ].map((text, i) => (
                <div key={i} className="overflow-hidden">
                  <div ref={el => { subtextItems.current[i] = el; }}>
                    <Text opacity={0.5}>
                      {text}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HookSection;
