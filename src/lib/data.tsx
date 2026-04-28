import React from 'react';
import { Briefcase, Cpu, Megaphone } from 'lucide-react';

export const founders = [
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

export const LANDING_SECTIONS = [
  { id: 'hook', label: 'Start' },
  { id: 'second-hook', label: 'Ecosystem' },
  { id: 'hero', label: 'Hero' },
  { id: 'problem', label: 'Problem' },
  { id: 'product', label: 'Product' },
];
