'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Briefcase, Cpu, Megaphone } from 'lucide-react';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TeamPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introTl = useRef<gsap.core.Timeline | null>(null);

  const founders = [
    {
      name: "David Creighton",
      role: "CEO/Co-Founder",
      tagline: "Serial Entrepreneur",
      description: "Operator-led. Tech-proven. GTM-native.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
      icon: <Briefcase className="text-primary" size={20} />
    },
    {
      name: "Adrian Lannon",
      role: "CTO/Co-Founder",
      tagline: "Founder of A Square",
      description: "10+ years building in Unity, simulation, & real-time systems.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
      icon: <Cpu className="text-primary" size={20} />
    },
    {
      name: "Forrester Kane",
      role: "CMO/Co-Founder",
      tagline: "Founder of Headword!",
      description: "Brand & go-to-market leader for frontier tech and creator platforms.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400",
      icon: <Megaphone className="text-primary" size={20} />
    }
  ];

  useGSAP(() => {
    introTl.current = gsap.timeline({
      defaults: { ease: "expo.out", duration: 1.5 }
    })
    .from(".team-reveal", {
      y: 80,
      opacity: 0,
      stagger: 0.2,
      skewY: 3,
    })
    .from(".founder-card", {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "power4.out",
      clearProps: "all"
    }, "-=0.8");

    // Scroll reversal logic: 
    // Reverses the intro when scrolling past the hero area (800px), 
    // plays it back when returning to the very top
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: 800,
      onLeave: () => introTl.current?.reverse(),
      onEnterBack: () => introTl.current?.play(),
      onRefresh: (self) => {
        if (self.progress === 0) introTl.current?.play();
      }
    });

    // Button reveal
    gsap.from(".join-btn", {
      scale: 0.8,
      opacity: 0,
      scrollTrigger: {
        trigger: ".join-btn",
        start: "top 90%",
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen py-32 px-6 md:px-24">
      <div className="max-w-7xl mx-auto space-y-32">
        <header className="max-w-4xl space-y-8">
          <div className="overflow-hidden">
            <Text variant="h1" className="team-reveal">
              "Founders Built<br />
              <Text variant="span" opacity={0.3}>for the Moment"</Text>
            </Text>
          </div>
          <Text className="text-primary font-bold uppercase tracking-widest team-reveal">
            "Operator-led. Tech-proven. GTM-native."
          </Text>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="premium-card flex flex-col gap-10 founder-card"
            >
              <div className="aspect-square w-full rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <Text variant="h4" className="text-2xl">{founder.name}</Text>
                  <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                    {founder.icon}
                    {founder.role}
                  </div>
                </div>
                <div className="space-y-4">
                  <Text variant="p" className="font-bold" opacity={0.8}>"{founder.tagline}"</Text>
                  <Text variant="p" className="italic" opacity={0.5}>"{founder.description}"</Text>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-24 text-center join-btn">
          <Button variant="primary" size="lg">
            "Join the Revolution"
          </Button>
        </div>
      </div>
    </div>
  );
}
