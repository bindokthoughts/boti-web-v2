import React from 'react';
import { Briefcase, Cpu, Megaphone } from 'lucide-react';

import davidImg from '../assets/images/founders/David_Creighton.jpg';
import adrianImg from '../assets/images/founders/Adrian_Lannon.png';
import forresterImg from '../assets/images/founders/Forrester_Kane.jpg';

export const founders = [
  {
    name: "David Creighton",
    role: "CEO/Co-Founder",
    tagline: "Serial Entrepreneur",
    description: "Operator-led. Tech-proven. GTM-native.",
    image: davidImg.src,
    icon: <Briefcase className="text-primary" size={20} />
  },
  {
    name: "Adrian Lannon",
    role: "CTO/Co-Founder",
    tagline: "Founder of A Square",
    description: "10+ years building in Unity, simulation, & real-time systems.",
    image: adrianImg.src,
    icon: <Cpu className="text-primary" size={20} />
  },
  {
    name: "Forrester Kane",
    role: "CMO/Co-Founder",
    tagline: "Founder of Headword!",
    description: "Brand & go-to-market leader for frontier tech and creator platforms.",
    image: forresterImg.src,
    icon: <Megaphone className="text-primary" size={20} />
  }
];

export const LANDING_SECTIONS = [
  { id: 'hook', label: 'Start' },
  { id: 'second-hook', label: 'Ecosystem' },
  { id: 'hero', label: 'Hero' },
  { id: 'problem', label: 'Problem' },
  { id: 'product', label: 'Product' },
  { id: 'team', label: 'Team' },
];
