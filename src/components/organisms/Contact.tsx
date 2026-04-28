import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Textarea from '../atoms/Textarea';
import Select from '../atoms/Select';

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

    gsap.from(".form-element", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 85%",
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
    <section ref={containerRef} className="relative py-32 px-6 md:px-16 overflow-hidden flex items-center justify-center min-h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full bg-glow opacity-30 -z-10" />
      
      <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-10 contact-content relative z-10">
        <Text variant="h2" className="font-bold text-5xl md:text-6xl text-center text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Contact Us Form
        </Text>

        <form className="w-full flex flex-col gap-4 contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-element">
            <Input type="text" placeholder="Enter your name" />
          </div>
          <div className="form-element">
            <Input type="email" placeholder="Enter your email" />
          </div>
          <div className="form-element">
            <Select 
              placeholder="Select a purpose"
              options={[
                { label: "General Inquiry", value: "general" },
                { label: "Partnership", value: "partnership" },
                { label: "Support", value: "support" }
              ]} 
            />
          </div>
          <div className="form-element">
            <Textarea placeholder="Enter your message" />
          </div>
          <div className="form-element pt-2">
            <Button variant="primary" size="lg" className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] border-none">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
