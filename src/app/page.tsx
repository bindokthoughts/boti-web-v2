'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

import HookSection from './landingpage/components/HookSection';
import SecondHookSection from './landingpage/components/SecondHookSection';
import HeroSection from './landingpage/components/HeroSection';
import ProblemSection from './landingpage/components/ProblemSection';
import ProductSection from './landingpage/components/ProductSection';
import FloatingNav from '@/components/atoms/FloatingNav';
import { LANDING_SECTIONS } from '@/lib/data';

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  const introTl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    // 1. Entrance Animation Timeline
    introTl.current = gsap.timeline({
      defaults: { ease: "expo.out", duration: 1.5 }
    })
    .from(".hero-boti", {
      scale: 1.5,
      opacity: 0,
      filter: "blur(20px)",
      duration: 3,
      ease: "power4.inOut",
      immediateRender: false,
      clearProps: "all"
    }, "+=1"); // Start after HookSection intro has begun

    // 2. Scroll Trigger for Reversal at Top
    ScrollTrigger.create({
      start: "top top",
      onEnter: () => {
        if (introTl.current?.reversed()) introTl.current.play();
      },
      onLeaveBack: () => {
        introTl.current?.reverse();
      }
    });

    // 3. Section specific animations
    gsap.to(heroTextRef.current, {
      scale: 1.2,
      opacity: 0.1,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top center",
        end: "bottom top",
        scrub: true,
      }
    });

    // Animate stats on scroll
    gsap.utils.toArray<HTMLElement>(".stats-grid").forEach((grid) => {
      gsap.from(grid.querySelectorAll(".stat-card"), {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
        }
      });
    });

    // Animate cards on scroll
    gsap.utils.toArray<HTMLElement>(".feature-grid").forEach((grid) => {
      gsap.from(grid.querySelectorAll(".feature-card"), {
        scale: 0.8,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
        }
      });
    });

    // 4. Generic Reveal Animations
    gsap.utils.toArray<HTMLElement>(".reveal-subtext").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col relative">
      <FloatingNav sections={LANDING_SECTIONS} />
      
      <div id="hook"><HookSection /></div>
      <div id="second-hook"><SecondHookSection /></div>
      <div id="hero"><HeroSection heroTextRef={heroTextRef} /></div>
      <div id="problem"><ProblemSection /></div>
      <div id="product"><ProductSection /></div>
    </div>
  );
}
