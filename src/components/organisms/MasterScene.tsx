'use client';

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { View, Preload } from '@react-three/drei';
import ParticleField from './ParticleField';
import MorphingParticles from './MorphingParticles';

const MasterScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        eventSource={typeof document !== 'undefined' ? (document.body as HTMLElement) : undefined}
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          stencil: true,
          depth: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        {/* Global background particles */}
        <ParticleField />

        {/* Morphing scroll-reactive particles */}
        <MorphingParticles />

        {/* Port for section-specific views */}
        <View.Port />

        <Preload all />
      </Canvas>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617] opacity-40 pointer-events-none" />
    </div>
  );
};

export default MasterScene;
