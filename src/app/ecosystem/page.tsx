'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Layers, Map } from 'lucide-react';
import Text from '@/components/atoms/Text';

export default function EcosystemPage() {
  const ecosystemItems = [
    {
      title: "BOTI Browser",
      tagline: "From scroll to spatial.",
      description: "Any flat site becomes a 3D space you can step inside, right in your browser.",
      icon: <Compass className="text-primary" size={32} />
    },
    {
      title: "BOTI Builder",
      tagline: "Immersive scenes. No code. No headset.",
      description: "Drag. Drop. Done. Worlds come alive.",
      icon: <Layers className="text-primary" size={32} />
    },
    {
      title: "BOTI Landscape",
      tagline: "An Al-powered evolution of the web",
      description: "discoverable Microverses, crafted, owned, and interlinked by users. The human-first Metaverse.",
      icon: <Map className="text-primary" size={32} />
    }
  ];

  return (
    <div className="min-h-screen py-32 px-6 md:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mb-32"
      >
        <Text variant="h2">
          "We rebuilt the browser for the world the web became."
        </Text>
      </motion.div>

      <div className="grid gap-16 md:gap-32">
        {ecosystemItems.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            <div className="space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/[0.08] border border-primary/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,70,255,0.05)]">
                {item.icon}
              </div>
              <div className="space-y-4">
                <Text variant="h4">{item.title}</Text>
                <Text variant="span" className="text-primary font-bold uppercase tracking-widest text-lg">{item.tagline}</Text>
              </div>
            </div>
            
            <div className="lg:pt-24">
              <Text opacity={0.6} className="text-xl md:text-2xl">
                {item.description}
              </Text>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-48 max-w-2xl"
      >
        <div className="premium-card">
          <Text variant="p" className="font-bold">
            "The Builder feeds the Browser. The Landscape grows from both."
          </Text>
        </div>
      </motion.div>
    </div>
  );
}
