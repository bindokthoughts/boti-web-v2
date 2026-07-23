'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Globe, Box } from 'lucide-react';
import SolutionCard from '@/components/atoms/SolutionCard';

const OurSolutionSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="min-h-screen py-32 px-6 md:px-12 lg:px-24 space-y-12 relative overflow-hidden">

      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[150px] rounded-full -z-10 pointer-events-none" />

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-24 feature-grid">
        <div className="overflow-hidden">
          <h3 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] feature-card text-white">
            BOTI has <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary/80">two parts</span>
          </h3>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto feature-grid relative z-10">

        {/* Browser Card */}
        <SolutionCard
          imageSrc="/images/product-browser.png"
          imageAlt="BOTI Browser"
          icon={<Globe size={32} />}
          title="BOTI Browser"
          description="How users experience the web."
          onClick={() => router.push('/ecosystem')}
        />

        {/* Builder Card */}
        <SolutionCard
          className="mt-12 lg:mt-0"
          imageSrc="/images/product-builder.png"
          imageAlt="BOTI Builder"
          icon={<Box size={32} />}
          title="BOTI Builder"
          description="Makes it easy to create a 3D space for your business, no tech skills or big budgets required."
          onClick={() => router.push('/business')}
        />
      </div>
    </section>
  );
};

export default OurSolutionSection;
