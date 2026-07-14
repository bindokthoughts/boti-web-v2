'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

export interface HoneycombItem {
  id: string;
  src: string;
  type: 'image' | 'video';
  title: string;
  description: string;
  objectPosition?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  scale?: number;
}

interface HoneycombGridProps {
  items: HoneycombItem[];
  rowsConfig?: number[]; // e.g. [3, 2] or [2, 3]
  gap?: number;          // spacing in pixels (virtual grid scale)
  className?: string;
}

const HoneycombGrid: React.FC<HoneycombGridProps> = ({
  items,
  rowsConfig = [3, 2],
  gap = 16,
  className = '',
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  // Geometry parameters (based on a base width of 200px per hexagon)
  const baseW = 200;
  const baseH = baseW * 2 / Math.sqrt(3); // Height of a pointy-topped hexagon
  const D = baseW + gap;                  // Horizontal spacing between column centers
  const V = D * Math.sqrt(3) / 2;         // Vertical spacing between row centers

  // Calculate coordinates for each item
  let itemIdx = 0;
  const rawCoords: Array<{ x: number; y: number; item: HoneycombItem; index: number }> = [];

  // Find the maximum count in rowsConfig to center rows dynamically relative to it
  const maxCount = Math.max(...rowsConfig);

  rowsConfig.forEach((count, r) => {
    // Dynamically calculate offset to center each row relative to maxCount
    const offset = (maxCount - count) / 2;

    for (let i = 0; i < count; i++) {
      if (itemIdx >= items.length) break;
      const x = (i + offset) * D;
      const y = r * V;
      rawCoords.push({ x, y, item: items[itemIdx], index: itemIdx });
      itemIdx++;
    }
  });

  if (rawCoords.length === 0) return null;

  // Bounding box in virtual pixels
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  rawCoords.forEach(({ x, y }) => {
    minX = Math.min(minX, x - baseW / 2);
    maxX = Math.max(maxX, x + baseW / 2);
    minY = Math.min(minY, y - baseH / 2);
    maxY = Math.max(maxY, y + baseH / 2);
  });

  const totalW = maxX - minX;
  const totalH = maxY - minY;

  // Calculate positioning as percentages of the total bounding box
  const positionedItems = rawCoords.map(({ x, y, item, index }) => {
    // Shift coordinates to align centered around the bounding box origin
    const shiftedX = x - (minX + maxX) / 2;
    const shiftedY = y - (minY + maxY) / 2;

    const left = ((shiftedX - (-totalW / 2)) / totalW) * 100;
    const top = ((shiftedY - (-totalH / 2)) / totalH) * 100;
    const width = (baseW / totalW) * 100;
    const height = (baseH / totalH) * 100;

    return {
      left: `${left}%`,
      top: `${top}%`,
      width: `${width}%`,
      height: `${height}%`,
      item,
      index,
    };
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeItemIndex !== null) {
      setActiveItemIndex((activeItemIndex - 1 + items.length) % items.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeItemIndex !== null) {
      setActiveItemIndex((activeItemIndex + 1) % items.length);
    }
  };

  return (
    <div className={`w-full relative flex items-center justify-center ${className}`}>

      {/* Honeycomb Grid Container */}
      <div
        className="w-full relative select-none"
        style={{ aspectRatio: `${totalW} / ${totalH}` }}
      >
        {positionedItems.map(({ left, top, width, height, item, index }) => (
          <div
            key={item.id}
            className="absolute group transition-all duration-300"
            style={{
              left,
              top,
              width,
              height,
              transform: 'translate(-50%, -50%)',
              zIndex: activeItemIndex === index ? 30 : 10,
            }}
            onClick={() => setActiveItemIndex(index)}
          >
            {/* Hexagon Wrapper with Clip-path and scaling hover */}
            <div
              className="w-full h-full relative overflow-hidden transition-all duration-500 ease-out shadow-2xl"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: 'rgba(2, 6, 23, 0.4)',
              }}
            >
              {/* Media Content */}
              {item.type === 'video' ? (
                <div className="w-full h-full relative">
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full filter brightness-[0.85] contrast-[1.05]"
                    style={{
                      objectFit: item.objectFit || 'cover',
                      objectPosition: item.objectPosition || 'center',
                      transform: item.scale ? `scale(${item.scale})` : undefined,
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-primary/20 backdrop-blur-md border border-primary/30 p-2 rounded-full text-white">
                    <Play size={2} className="fill-white" />
                  </div>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full filter brightness-[0.85] contrast-[1.05] transition-all duration-500"
                  style={{
                    objectFit: item.objectFit || 'cover',
                    objectPosition: item.objectPosition || 'center',
                    transform: item.scale ? `scale(${item.scale})` : undefined,
                  }}
                />
              )}


            </div>

            {/* White Hexagon Border Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-100 transition-all duration-500 ease-out"
              viewBox="0 0 100 115.47"
              preserveAspectRatio="none"
            >
              <polygon
                points="50,0.8 99.2,29.2 99.2,86.2 50,114.6 0.8,86.2 0.8,29.2"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.25"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Lightbox / Slideshow Modal */}
      <AnimatePresence>
        {activeItemIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-background/95 backdrop-blur-xl px-4 md:px-12 py-8"
            onClick={() => setActiveItemIndex(null)}
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
                onClick={() => setActiveItemIndex(null)}
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
                {items[activeItemIndex].type === 'video' ? (
                  <video
                    src={items[activeItemIndex].src}
                    autoPlay
                    loop
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={items[activeItemIndex].src}
                    alt={items[activeItemIndex].title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Content Panel */}
              <div className="w-full md:w-2/5 flex flex-col justify-center text-left space-y-6">
                <div>
                  <span className="text-accent text-xs tracking-widest uppercase font-extrabold px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10">
                    {items[activeItemIndex].type}
                  </span>
                  <h3 className="text-3xl md:text-4xl text-white font-extrabold tracking-tight mt-6 leading-tight">
                    {items[activeItemIndex].title}
                  </h3>
                </div>

                <p className="text-foreground/80 text-base md:text-lg leading-relaxed font-medium">
                  {items[activeItemIndex].description}
                </p>

                <div className="pt-4 border-t border-foreground/5 flex items-center justify-between">
                  <span className="text-foreground/40 text-xs font-semibold uppercase tracking-wider">
                    Tile {activeItemIndex + 1} of {items.length}
                  </span>
                  <button
                    onClick={() => setActiveItemIndex(null)}
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
    </div>
  );
};

export default HoneycombGrid;
