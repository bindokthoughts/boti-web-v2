'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import HoneycombLightbox from './HoneycombLightbox';

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
          // onClick={() => setActiveItemIndex(index)}
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

          </div>
        ))}
      </div>

      {/* Lightbox / Slideshow Modal */}
      {/* <HoneycombLightbox
        items={items}
        activeIndex={activeItemIndex}
        onClose={() => setActiveItemIndex(null)}
        onChangeActiveIndex={setActiveItemIndex}
      /> */}
    </div>
  );
};

export default HoneycombGrid;
