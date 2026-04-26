'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Rocket, Code, Layers } from 'lucide-react';
import Text from '@/components/atoms/Text';

export default function BusinessPage() {
  const strategyItems = [
    {
      title: "Immersive BOTI Pilot",
      description: "We build custom 3D scenes for early brand partners",
      icon: <Code className="w-6 h-6 text-primary" />,
      tag: "Phase 01"
    },
    {
      title: "BOTI Browser Launch",
      description: "Public freemium + ad units & creation pipeline",
      icon: <Rocket className="w-6 h-6 text-primary" />,
      tag: "Phase 02"
    },
    {
      title: "BOTI Builder Ecosystem",
      description: "No-code tools + template library + SaaS subscriptions",
      icon: <Layers className="w-6 h-6 text-primary" />,
      tag: "Phase 03"
    }
  ];

  const stats = [
    { label: "Target Partners", value: "500", unit: "+" },
    { label: "Scene Templates", value: "2.5", unit: "k" },
    { label: "User Retention", value: "85", unit: "%" },
    { label: "Avg. Engagement", value: "12", unit: "min" }
  ];

  return (
    <div className="min-h-screen py-32 px-6 md:px-24">
      <div className="max-w-7xl mx-auto space-y-32">
        <header className="max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--glass-border)] text-primary text-xs font-bold uppercase tracking-widest bg-primary/[0.03]"
          >
            <TrendingUp size={14} />
            "Our revenue engine is immersive, intelligent, and compounding."
          </motion.div>
          <Text variant="h2">
            "Scale the<br />
            <Text variant="span" opacity={0.3}>Immersive Economy"</Text>
          </Text>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {strategyItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="premium-card space-y-12"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-primary/[0.08] border border-primary/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,70,255,0.05)]">
                  {item.icon}
                </div>
                <Text variant="span" className="text-[10px] font-bold uppercase tracking-widest" opacity={0.4}>{item.tag}</Text>
              </div>
              <div className="space-y-4">
                <Text variant="h4" className="text-2xl">{item.title}</Text>
                <Text opacity={0.6}>"{item.description}"</Text>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <Text variant="span" className="text-xs font-bold uppercase tracking-widest" opacity={0.4}>{stat.label}</Text>
              <div className="flex items-baseline gap-1">
                <Text variant="span" className="text-5xl md:text-7xl font-bold tracking-tighter">{stat.value}</Text>
                <Text variant="span" className="text-primary font-bold">{stat.unit}</Text>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="premium-card bg-foreground text-background p-12 md:p-24 rounded-[3rem] text-center space-y-12"
        >
          <Text variant="h2" className="text-3xl md:text-6xl text-background">
            "We aren't building a tool.<br />
            <span className="opacity-40">We're building the infrastructure."</span>
          </Text>
          <Text variant="p" className="text-background opacity-60 max-w-2xl mx-auto">
            "The future of business isn't flat. It's spatial, interactive, and owned by the creators."
          </Text>
        </motion.div>
      </div>
    </div>
  );
}
