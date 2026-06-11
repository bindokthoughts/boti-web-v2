'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { founders } from '@/lib/data';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import FounderCard from '@/components/atoms/FounderCard';
import Contact from '@/components/organisms/Contact';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TeamPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introTl = useRef<gsap.core.Timeline | null>(null);



  useGSAP(() => {
    // Initialize timeline as paused so we can control it based on starting scroll position
    introTl.current = gsap.timeline({
      paused: true,
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

    // Scroll trigger to play/reverse timeline based on scroll position
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: 800,
      onLeave: () => introTl.current?.reverse(),
      onEnterBack: () => introTl.current?.play(),
      onEnter: () => introTl.current?.play(),
      onRefresh: (self) => {
        // Handle page refresh/reload when already scrolled
        if (self.scroll() < 800) {
          introTl.current?.play();
        } else {
          introTl.current?.progress(0).pause();
        }
      }
    });

    // Button reveal (only animate if the button is present in the DOM)
    if (containerRef.current?.querySelector('.join-btn')) {
      gsap.from(".join-btn", {
        scale: 0.8,
        opacity: 0,
        scrollTrigger: {
          trigger: ".join-btn",
          start: "top 90%",
        }
      });
    }

  }, { scope: containerRef });

  return (
    <>
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
              <FounderCard key={founder.name} {...founder} />
            ))}
          </div>

          {/* <div className="pt-24 text-center join-btn">
            <Button variant="primary" size="lg">
              "Join the Revolution"
            </Button>
          </div> */}
        </div>
      </div>
      <div id="contact"><Contact /></div>
    </>
  );
}
