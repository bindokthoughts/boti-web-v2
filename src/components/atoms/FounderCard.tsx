import React, { ReactNode } from 'react';
import Text from '@/components/atoms/Text';

export interface FounderCardProps {
  name: string;
  image: string;
  icon: ReactNode;
  role: string;
  tagline: string;
  description: string;
  linkedin: string;
  corporateLogo: string;
}

const LinkedinIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function FounderCard({
  name,
  image,
  icon,
  role,
  tagline,
  description,
  linkedin,
  corporateLogo,
}: FounderCardProps) {
  return (
    <div className="relative rounded-[2.5rem] overflow-hidden group founder-card hover:-translate-y-4 transition-all duration-500 shadow-2xl shadow-black/50">
      {/* Background Hover Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 group-hover:border-primary/30 transition-colors duration-500 pointer-events-none z-20" />

      {/* Content Layer with Glass Effect */}
      <div className="relative h-full w-full bg-background/40 backdrop-blur-xl flex flex-col gap-10 p-8 md:p-10 z-10">
        <div className="aspect-square w-full rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="space-y-2 mb-6">
              <Text variant="h4" className="text-2xl">{name}</Text>
              <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                {icon}
                {role}
              </div>
            </div>
            <div className="space-y-4">
              <Text variant="p" className="font-bold" opacity={0.8}>{tagline}</Text>
              <Text variant="p" className="whitespace-pre-line" opacity={0.7}>{description}</Text>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-[var(--glass-border)] mt-6 relative z-30">
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary transition-colors pointer-events-auto">
              <LinkedinIcon size={24} />
            </a>
            {corporateLogo && (
              <img src={corporateLogo} alt={`${name}'s company logo`} className="h-8 max-w-[200px] object-contain opacity-70 grayscale group-hover:grayscale-0 transition-all duration-300" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
