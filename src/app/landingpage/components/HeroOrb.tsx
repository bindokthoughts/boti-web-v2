'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const HeroOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const time = timeRef.current;
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#4477FF"
          speed={4}
          distort={0.6}
          radius={1}
        />
      </Sphere>
      <pointLight position={[2, 2, 2]} intensity={2} color="#0046FF" />
    </>
  );
};

export default HeroOrb;
