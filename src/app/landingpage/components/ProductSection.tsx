'use client';

import React from 'react';
import Text from '@/components/atoms/Text';

const ProductSection: React.FC = () => {
  return (
    <section className="min-h-screen py-32 px-6 md:px-24 flex items-center feature-grid">
      <div className="max-w-5xl space-y-8">
        <div className="overflow-hidden">
          <h3 className="text-4xl md:text-8xl font-bold tracking-tight leading-[0.9] feature-card">
            BOTI is the first browser that transforms 2D websites into <br />
            <Text variant="span" className="text-primary">3D experiences.</Text>
          </h3>
        </div>
        <div className="flex flex-col md:flex-row gap-8 reveal-subtext">
          <Text opacity={0.4}>• You walk, look, and interact instead of scrolling.</Text>
          <Text opacity={0.4}>• Items on your page come to life, with shadows and depth.</Text>
          <Text opacity={0.4}>• Step inside the web.</Text>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
