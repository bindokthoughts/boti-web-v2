import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".contact-content", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    gsap.to(".bg-glow", {
      opacity: 0.6,
      scale: 1.2,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-24 px-6 md:px-16 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full bg-glow opacity-30 -z-10" />
      
      <div className="max-w-7xl mx-auto premium-card flex flex-col items-center text-center gap-10 contact-content">
        <div className="space-y-4">
          <Text variant="span" className="text-primary font-bold tracking-[0.3em] uppercase text-xs">
            Ready to dive in?
          </Text>
          <Text variant="h2" className="text-gradient">
            Build the Future <br className="hidden md:block" /> of the Spatial Web.
          </Text>
          <Text variant="p" className="max-w-2xl mx-auto text-foreground/60">
            Join the ecosystem and start creating immersive experiences that live beyond the screen. Our team is here to help you scale.
          </Text>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="primary" size="lg">
            Contact Us
          </Button>
          <Button variant="outline" size="lg">
            Read Docs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
