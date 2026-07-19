'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { HoneycombItem } from './HoneycombGrid';

interface HoneycombLightboxProps {
  items: HoneycombItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeActiveIndex: (index: number) => void;
}

const HoneycombLightbox: React.FC<HoneycombLightboxProps> = ({
  items,
  activeIndex,
  onClose,
  onChangeActiveIndex,
}) => {
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      onChangeActiveIndex((activeIndex - 1 + items.length) % items.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      onChangeActiveIndex((activeIndex + 1) % items.length);
    }
  };

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  return (
    <AnimatePresence>
      {activeIndex !== null && activeItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background/95 backdrop-blur-xl px-4 md:px-12 py-8"
          onClick={onClose}
        >
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative max-w-5xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-slate-950/40 border border-foreground/5 p-6 md:p-10 rounded-[2rem] glass shadow-glow-strong"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 z-50 text-foreground/60 hover:text-white bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 p-3 rounded-full transition-all duration-300"
              onClick={onClose}
            >
              <X size={20} />
            </button>

            {/* Prev Button */}
            <button
              className="absolute left-4 md:-left-16 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-white bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 p-3 rounded-full transition-all duration-300 z-10"
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              className="absolute right-4 md:-right-16 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-white bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 p-3 rounded-full transition-all duration-300 z-10"
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>

            {/* Media Visual */}
            <div
              className="w-full md:w-3/5 aspect-[4/3] rounded-[1.5rem] overflow-hidden border border-foreground/5 shadow-2xl relative"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              {activeItem.type === 'video' ? (
                <video
                  src={activeItem.src}
                  autoPlay
                  loop
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={activeItem.src}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Content Panel */}
            <div className="w-full md:w-2/5 flex flex-col justify-center text-left space-y-6">
              <div>
                <span className="text-accent text-xs tracking-widest uppercase font-extrabold px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10">
                  {activeItem.type}
                </span>
                <h3 className="text-3xl md:text-4xl text-white font-extrabold tracking-tight mt-6 leading-tight">
                  {activeItem.title}
                </h3>
              </div>

              <p className="text-foreground/80 text-base md:text-lg leading-relaxed font-medium">
                {activeItem.description}
              </p>

              <div className="pt-4 border-t border-foreground/5 flex items-center justify-between">
                <span className="text-foreground/40 text-xs font-semibold uppercase tracking-wider">
                  Tile {activeIndex + 1} of {items.length}
                </span>
                <button
                  onClick={onClose}
                  className="text-primary hover:text-accent font-bold text-sm tracking-wider uppercase transition-colors duration-300"
                >
                  Back to Gallery
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HoneycombLightbox;
