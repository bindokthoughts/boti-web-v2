import React, { ReactNode } from 'react';
import Text from '@/components/atoms/Text';

export interface FounderCardProps {
  name: string;
  image: string;
  icon: ReactNode;
  role: string;
  tagline: string;
  description: string;
}

export default function FounderCard({
  name,
  image,
  icon,
  role,
  tagline,
  description,
}: FounderCardProps) {
  return (
    <div className="premium-card flex flex-col gap-10 founder-card">
      <div className="aspect-square w-full rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-6 flex-1">
        <div className="space-y-2">
          <Text variant="h4" className="text-2xl">{name}</Text>
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
            {icon}
            {role}
          </div>
        </div>
        <div className="space-y-4">
          <Text variant="p" className="font-bold" opacity={0.8}>"{tagline}"</Text>
          <Text variant="p" className="italic" opacity={0.5}>"{description}"</Text>
        </div>
      </div>
    </div>
  );
}
