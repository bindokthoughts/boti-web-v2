'use client';

import React from 'react';
import Text from '@/components/atoms/Text';

const ProblemSection: React.FC = () => {
  return (
    <section className="min-h-screen py-32 px-6 md:px-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <div className="space-y-4 feature-grid">
            {/* <div className="overflow-hidden">
              <Text className="text-primary font-bold tracking-widest uppercase text-sm feature-card">What's the problem?</Text>
            </div> */}
            <div className="overflow-hidden">
              <Text variant="h3" className="feature-card">Most websites look flat, and that’s boring.</Text>
            </div>
          </div>
          <Text opacity={0.6} className="reveal-subtext">
            Microdoses of information and entertainment have become the norm. If something doesn’t grab our attention right away, we move on and forget about it.
          </Text>
          <div className="pt-8 reveal-subtext">
            <Text variant="h4">A dynamic website is critical. VR is gaining popularity and websites need to keep up to stay relevant.</Text>
          </div>
        </div>

        <div className="stats-grid grid gap-8 relative">
          {/* Decorative blur elements for stronger glass effect context */}
          {/* <div className="absolute -inset-4  blur-xl -z-10 rounded-full opacity-10"></div> */}

          <div className="stat-card backdrop-blur-[2px] shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] rounded-[2rem] p-8 md:p-12 space-y-12 transition-all duration-500 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] hover:border-white/30">
            <Text variant="p" className="text-sm font-bold uppercase tracking-widest" opacity={0.6}>The Flat Web Is Losing Us:</Text>
            <div className="grid gap-12">
              <div className="space-y-2">
                <h2 className="text-4xl md:text-6xl font-bold drop-shadow-lg text-foreground">91<span className="text-primary">%</span></h2>
                <Text className="font-bold uppercase text-sm tracking-widest" opacity={0.6}>Bounce rate</Text>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-4xl md:text-6xl font-bold drop-shadow-lg text-foreground">1.4<span className="text-primary">%</span></h2>
                  <Text variant="p" className="font-bold uppercase text-sm tracking-widest" opacity={0.6}>Avg. scroll depth</Text>
                </div>
                <div className="pt-2 border-t border-foreground/10">
                  <Text variant="p" className="font-extrabold uppercase text-xs tracking-widest text-primary drop-shadow-sm mt-4">2x-4x Higher conversion in immersive formats</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
