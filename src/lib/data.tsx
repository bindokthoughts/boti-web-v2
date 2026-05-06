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
    description: "Serial Entrepreneur. Leads vision, IP, and investor relations.",
    image: davidImg.src,
    icon: <Briefcase className="text-primary" size={20} />
  },
  {
    name: "Adrian Lannon",
    role: "CTO/Co-Founder",
    tagline: "Founder of A Square",
    description: "Founder of A Square. 10+ years in Unity and real-time systems.",
    image: adrianImg.src,
    icon: <Cpu className="text-primary" size={20} />
  },
  {
    name: "Forrester Kane",
    role: "CMO/Co-Founder",
    tagline: "Founder of Headword!",
    description: "Founder of Headword!. Brand and go-to-market leader.",
    image: forresterImg.src,
    icon: <Megaphone className="text-primary" size={20} />
  }
];

export const LANDING_SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'product', label: 'Product' },
  { id: 'problem', label: 'Problem' },
  { id: 'parts', label: 'Parts' },
  { id: 'team', label: 'Team' },
  { id: 'contact', label: 'Contact' },
];
