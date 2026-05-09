import React from 'react';
import Image from 'next/image';
import Text from '@/components/atoms/Text';

export interface SolutionCardProps {
  imageSrc: string;
  imageAlt: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  imageSrc,
  imageAlt,
  icon,
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`relative rounded-[2.5rem] overflow-hidden group feature-card hover:-translate-y-4 transition-all duration-500 shadow-2xl shadow-black/50 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 group-hover:border-primary/30 transition-colors duration-500 pointer-events-none z-20" />

      <div className="relative h-full w-full bg-background/40 backdrop-blur-xl overflow-hidden flex flex-col min-h-[500px]">
        <div className="relative h-[300px] w-full shrink-0 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-8 left-10 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(0,70,255,0.6)] group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
        </div>

        <div className="p-10 pt-4 flex-1 flex flex-col justify-start space-y-4 z-10 relative">
          <Text variant="h3" className="text-4xl md:text-5xl font-bold text-white">{title}</Text>
          <Text opacity={0.6} className="text-xl md:text-2xl leading-relaxed">{description}</Text>
        </div>
      </div>
    </div>
  );
};

export default SolutionCard;
