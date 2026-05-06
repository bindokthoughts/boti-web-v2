'use client';

import React from 'react';
import Image from 'next/image';
import { Globe, Box, Smartphone } from 'lucide-react';
import Text from '@/components/atoms/Text';

const PartsSection: React.FC = () => {
  return (
    <section className="min-h-screen py-32 px-6 md:px-24 space-y-32 feature-grid">
      <div className="max-w-5xl space-y-8">
        <div className="overflow-hidden">
          <h3 className="text-4xl md:text-8xl font-bold tracking-tight leading-[0.9] feature-card">
            BOTI has <Text variant="span" className="text-primary">two parts</Text>
          </h3>
        </div>
        <div className="flex flex-col md:flex-row gap-8 reveal-subtext">
          <Text opacity={0.4}>Browser - how users experience the web.</Text>
          <Text opacity={0.4}>Builder - how businesses create it.</Text>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl feature-grid">
        <div className="premium-card p-0 overflow-hidden group feature-card hover:-translate-y-2 transition-transform duration-500">
          <div className="relative h-64 w-full">
            <Image src="/images/product-browser.png" alt="BOTI Browser" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,70,255,0.4)]">
              <Globe size={24} />
            </div>
          </div>
          <div className="p-8 space-y-4">
            <Text variant="h4">BOTI Browser</Text>
            <Text opacity={0.4}>How users experience the web.</Text>
          </div>
        </div>

        <div className="premium-card p-0 overflow-hidden group border-primary/20 feature-card hover:-translate-y-2 transition-transform duration-500">
          <div className="relative h-64 w-full">
            <Image src="/images/product-builder.png" alt="BOTI Builder" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 w-12 h-12 bg-foreground rounded-xl flex items-center justify-center text-background">
              <Box size={24} />
            </div>
          </div>
          <div className="p-8 space-y-4">
            <Text variant="h4">BOTI Builder</Text>
            <Text opacity={0.4}>BOTI Builder makes it easy to create a 3D space for your business, no tech skills or big budgets required.</Text>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-12 py-24 feature-grid">
        <div className="feature-card space-y-12">
          <div className="flex justify-center">
            <Smartphone className="text-primary" size={64} strokeWidth={1.5} />
          </div>
          <Text variant="p" className="text-2xl md:text-5xl font-bold tracking-tight leading-tight">
            "We play video games to escape. Bring that experience to your business and it becomes alive and fun."
          </Text>
          <div className="inline-flex px-8 py-4 rounded-full border border-primary/20 text-foreground/60 font-bold text-sm tracking-widest uppercase bg-primary/[0.03]">
            Built in Unity. Works on any device. No headset required.
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartsSection;
