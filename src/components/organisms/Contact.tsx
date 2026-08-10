import React, { useRef, useState } from 'react';
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  useGSAP(() => {
    gsap.from(".contact-content", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      clearProps: "all",
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
      clearProps: "all",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. A confirmation email has been sent to your inbox.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Failed to send your message. Please try again.',
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'An error occurred while sending your message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={containerRef} className="relative py-24 px-6 md:px-16 overflow-hidden flex items-center justify-center min-h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full bg-glow opacity-30 -z-10" />

      <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-10 contact-content relative z-10">
        <Text variant="h2" className="font-bold text-5xl md:text-6xl text-center text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Contact Us
        </Text>

        <form className="w-full flex flex-col gap-4 contact-form" onSubmit={handleSubmit}>
          {status.type && (
            <div
              className={`p-4 text-sm font-medium text-center transition-all duration-300 ${status.type === 'success'
                ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300'
                : 'bg-rose-500/20 border border-rose-500/50 text-rose-300'
                }`}
            >
              {status.message}
            </div>
          )}

          <div className="form-element">
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className="backdrop-blur-sm"
              required
            />
          </div>
          <div className="form-element">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className="backdrop-blur-sm"
              required
            />
          </div>
          <div className="form-element">
            <Select
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={isSubmitting}
              options={[
                { label: "General Inquiry", value: "General Inquiry" },
                { label: "Partnership", value: "Partnership" },
                { label: "Support", value: "Support" },
                { label: "Feedback", value: "Feedback" }
              ]}
              className="backdrop-blur-sm"
              required
            />
          </div>
          <div className="form-element">
            <Textarea
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              className="backdrop-blur-sm"
              required
            />
          </div>
          <div className="form-element pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
