'use client';

import React from 'react';
import Text from '@/components/atoms/Text';

const ProblemSection: React.FC = () => {
  return (
    <section className="min-h-screen py-32 px-6 md:px-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <div className="space-y-4 feature-grid">
            <div className="overflow-hidden">
              <Text className="text-primary font-bold tracking-widest uppercase text-sm feature-card">"What's the problem?"</Text>
            </div>
            <div className="overflow-hidden">
              <Text variant="h3" className="feature-card">"Most websites look flat, and that’s boring."</Text>
            </div>
          </div>
          <Text opacity={0.6} className="reveal-subtext">
            "Microdoses of information and entertainment have become the norm. If something doesn’t grab our attention right away, we move on and forget about it."
          </Text>
          <div className="pt-8 reveal-subtext">
            <Text variant="h4">"A dynamic website is critical. VR is gaining popularity and websites need to keep up."</Text>
          </div>
        </div>

        <div className="stats-grid grid gap-8">
          <div className="stat-card premium-card space-y-12">
            <Text variant="p" className="text-sm font-bold uppercase tracking-widest" opacity={0.4}>"The Flat Web Is Losing Us:"</Text>
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-2">
                <Text variant="p" className="text-6xl md:text-8xl font-bold tracking-tighter">91%</Text>
                <Text variant="p" className="font-bold uppercase text-xs tracking-widest" opacity={0.4}>"Bounce rate"</Text>
              </div>
              <div className="space-y-2">
                <Text variant="p" className="text-6xl md:text-8xl font-bold tracking-tighter">1.4%</Text>
                <Text variant="p" className="font-bold uppercase text-xs tracking-widest" opacity={0.4}>"Avg. scroll depth"</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
