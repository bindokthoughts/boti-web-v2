import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { founders } from '@/lib/data';
import Text from '@/components/atoms/Text';
import FounderCard from '@/components/atoms/FounderCard';

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".team-reveal", {
      y: 80,
      opacity: 0,
      stagger: 0.2,
      skewY: 3,
      duration: 1.5,
      ease: "expo.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    gsap.from(".founder-card", {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "power4.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".founder-cards-grid",
        start: "top 85%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-16 min-h-screen flex items-center relative z-10 bg-background/50">
      <div className="w-full max-w-7xl mx-auto space-y-20">
        <header className="max-w-4xl space-y-6">
          <div className="overflow-hidden">
            <Text variant="h2" className="team-reveal text-5xl md:text-6xl font-bold text-white">
              Our Team
            </Text>
          </div>
          <Text className="text-primary font-bold uppercase tracking-widest team-reveal">
            Operator-led. Tech-proven. GTM-native.
          </Text>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 founder-cards-grid">
          {founders.map((founder) => (
            <FounderCard key={founder.name} {...founder} />
          ))}
        </div>
      </div>
    </section>
  );
}
