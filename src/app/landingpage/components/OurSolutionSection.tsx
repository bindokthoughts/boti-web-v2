'use client';

import React from 'react';
import Image from 'next/image';
import { Globe, Box, Smartphone } from 'lucide-react';
import Text from '@/components/atoms/Text';

const OurSolutionSection: React.FC = () => {
  return (
    <section className="min-h-screen py-32 px-6 md:px-12 lg:px-24 space-y-12 relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[150px] rounded-full -z-10 pointer-events-none" />

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-24 feature-grid">
        <div className="overflow-hidden">
          <h3 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] feature-card text-white">
            BOTI has <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary/80">two parts</span>
          </h3>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto feature-grid relative z-10">
        
        {/* Browser Card */}
        <div className="relative rounded-[2.5rem] overflow-hidden group feature-card hover:-translate-y-4 transition-all duration-500 shadow-2xl shadow-black/50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 group-hover:border-primary/30 transition-colors duration-500 pointer-events-none z-20" />
          
          <div className="relative h-full w-full bg-background/40 backdrop-blur-xl overflow-hidden flex flex-col min-h-[500px]">
            <div className="relative h-[300px] w-full shrink-0 overflow-hidden">
              <Image 
                src="/images/product-browser.png" 
                alt="BOTI Browser" 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw" 
                className="object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute bottom-8 left-10 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(0,70,255,0.6)] group-hover:scale-110 transition-transform duration-500">
                <Globe size={32} />
              </div>
            </div>
            
            <div className="p-10 pt-4 flex-1 flex flex-col justify-start space-y-4 z-10 relative">
              <Text variant="h3" className="text-4xl md:text-5xl font-bold text-white">BOTI Browser</Text>
              <Text opacity={0.6} className="text-xl md:text-2xl leading-relaxed">How users experience the web.</Text>
            </div>
          </div>
        </div>

        {/* Builder Card */}
        <div className="relative rounded-[2.5rem] overflow-hidden group feature-card hover:-translate-y-4 transition-all duration-500 shadow-2xl shadow-black/50 mt-12 lg:mt-0">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 group-hover:border-foreground/30 transition-colors duration-500 pointer-events-none z-20" />
          
          <div className="relative h-full w-full bg-background/40 backdrop-blur-xl overflow-hidden flex flex-col min-h-[500px]">
            <div className="relative h-[300px] w-full shrink-0 overflow-hidden">
              <Image 
                src="/images/product-builder.png" 
                alt="BOTI Builder" 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw" 
                className="object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute bottom-8 left-10 w-16 h-16 bg-foreground rounded-2xl flex items-center justify-center text-background shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform duration-500">
                <Box size={32} />
              </div>
            </div>
            
            <div className="p-10 pt-4 flex-1 flex flex-col justify-start space-y-4 z-10 relative">
              <Text variant="h3" className="text-4xl md:text-5xl font-bold text-white">BOTI Builder</Text>
              <Text opacity={0.6} className="text-xl md:text-2xl leading-relaxed">
                Makes it easy to create a 3D space for your business, no tech skills or big budgets required.
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Impactful Quote */}
      <div className="max-w-6xl mx-auto text-center py-32 mt-24 feature-grid relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-primary/10 blur-[150px] rounded-full -z-10 pointer-events-none" />
        
        <div className="feature-card space-y-16 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_50px_rgba(0,70,255,0.2)]">
            <Smartphone className="text-primary" size={40} strokeWidth={1.5} />
          </div>
          
          <Text variant="h2" className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white drop-shadow-2xl">
            "We play video games to escape. <br className="hidden md:block"/> 
            <span className="text-primary/90">Bring that experience to your business</span> <br className="hidden md:block"/>
            and it becomes alive and fun."
          </Text>

          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-primary/30 text-white font-bold text-sm tracking-widest uppercase bg-background/50 backdrop-blur-xl shadow-[0_0_30px_rgba(0,70,255,0.15)] mt-8">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,70,255,0.8)]" />
            Built in Unity. Works on any device. No headset required.
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurSolutionSection;
