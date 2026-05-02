'use client';

import React from 'react';
import { Globe, Box, Smartphone } from 'lucide-react';
import Text from '@/components/atoms/Text';

const ProductSection: React.FC = () => {
  return (
    <section className="min-h-screen py-32 px-6 md:px-24 space-y-32 feature-grid">
      <div className="max-w-5xl space-y-8">
        <div className="overflow-hidden">
          <h3 className="text-4xl md:text-8xl font-bold tracking-tight leading-[0.9] feature-card">
            You don't scroll through BOTI.<br />
            <Text variant="span" className="text-primary">You step inside.</Text>
          </h3>
        </div>
        <div className="flex flex-col md:flex-row gap-8 reveal-subtext">
          <Text opacity={0.4}>• Every click becomes a step.</Text>
          <Text opacity={0.4}>• Every brand becomes a place.</Text>
          <Text opacity={0.4}>• Every visit becomes a memory.</Text>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 feature-grid">
        <div className="premium-card space-y-8 group feature-card hover:-translate-y-2 transition-transform duration-500">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,70,255,0.4)]">
            <Globe size={32} />
          </div>
          <div className="space-y-4">
            <Text variant="h4">BOTI Browser</Text>
            <Text opacity={0.4}>From scroll to spatial. Any flat site becomes a 3D space you can step inside, right in your browser.</Text>
          </div>
        </div>

        <div className="premium-card space-y-8 group border-primary/20 feature-card hover:-translate-y-2 transition-transform duration-500">
          <div className="w-16 h-16 bg-foreground rounded-2xl flex items-center justify-center text-background">
            <Box size={32} />
          </div>
          <div className="space-y-4">
            <Text variant="h4">BOTI Builder</Text>
            <Text opacity={0.4}>Immersive scenes. No code. No headset. Drag. Drop. Done. Worlds come alive.</Text>
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

export default ProductSection;
