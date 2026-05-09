import React from 'react';
import { Briefcase, Cpu, Megaphone } from 'lucide-react';

import davidImg from '../assets/images/founders/David_Creighton.jpg';
import adrianImg from '../assets/images/founders/Adrian_Lannon.png';
import forresterImg from '../assets/images/founders/Forrester_Kane.jpg';

import equilibriaLogo from '../assets/images/partner_logos/Equilibria.png';
import aSquareLogo from '../assets/images/partner_logos/A_Square.webp';
import headwordLogo from '../assets/images/partner_logos/logo-headword.png';

export const founders = [
  {
    name: "David Creighton",
    role: "CEO/CO-FOUNDER",
    tagline: "Serial Entrepreneur",
    description: "Background in operations, innovation strategy, and venture development.\nLeads BOTI’s vision, strategy and investor relations.",
    image: davidImg.src,
    icon: <Briefcase className="text-primary" size={20} />,
    linkedin: "https://www.linkedin.com/in/david-creighton-5716b9143/",
    corporateLogo: equilibriaLogo.src
  },
  {
    name: "Adrian Lannon",
    role: "CTO/CO-FOUNDER",
    tagline: "Founder of A Square Games and Simulation",
    description: "10+ years building in Unity, VR/AR simulation, and real-time systems.\nDriving BOTI’s development from MVP to full launch and iterative evolutions.",
    image: adrianImg.src,
    icon: <Cpu className="text-primary" size={20} />,
    linkedin: "https://www.linkedin.com/in/adrian-lannon-b1b825175/",
    corporateLogo: aSquareLogo.src
  },
  {
    name: "Forrester Kane",
    role: "CMO/CO-FOUNDER",
    tagline: "Founder of Headword!",
    description: "Brand & go-to-market leader for frontier tech and creator platforms.\nHeading BOTI’s social launch, influencer strategy and crowdfund.",
    image: forresterImg.src,
    icon: <Megaphone className="text-primary" size={20} />,
    linkedin: "https://www.linkedin.com/in/forresterkane/",
    corporateLogo: headwordLogo.src
  }
];

export const LANDING_SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'product', label: 'Product' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'team', label: 'Team' },
  { id: 'contact', label: 'Contact' },
];
