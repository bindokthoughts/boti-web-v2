'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MorphingParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);
  
  const count = 2000;
  
  // Shape 1: Sphere
  const spherePositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 3;
      pos[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  // Shape 2: Grid/Plane
  const gridPositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const size = 10;
    const side = Math.floor(Math.sqrt(count));
    for (let i = 0; i < count; i++) {
      const x = (i % side) - side / 2;
      const y = Math.floor(i / side) - side / 2;
      pos[i * 3] = x * (size / side);
      pos[i * 3 + 1] = y * (size / side);
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1; // Slight depth
    }
    return pos;
  }, []);

  // Current positions that will be morphed
  const currentPositions = useMemo(() => new Float32Array(spherePositions), [spherePositions]);

  const mouse = useRef({ x: 0, y: 0 });

  useGSAP(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5);
      mouse.current.y = (e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  });

  useGSAP(() => {
    const obj = { progress: 0 };
    
    gsap.to(obj, {
      progress: 1,
      scrollTrigger: {
        trigger: "#root-layout",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
      onUpdate: () => {
        if (!pointsRef.current) return;
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        
        for (let i = 0; i < count * 3; i++) {
          positions[i] = THREE.MathUtils.lerp(
            spherePositions[i],
            gridPositions[i],
            obj.progress
          );
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
      }
    });
  }, [spherePositions, gridPositions]);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const time = timeRef.current;
    if (pointsRef.current) {
      const targetRotationY = time * 0.15 + (mouse.current.x * 1.0);
      const targetRotationX = -mouse.current.y * 0.8;

      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotationX, 0.1);
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRotationY, 0.1);

      // Add prominent position shift for the morphing field too
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mouse.current.x * 3, 0.1);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, (mouse.current.y * 2) + Math.sin(time * 0.5) * 0.2, 0.1);
    }
  });

  return (
    <Points ref={pointsRef} positions={currentPositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4477FF"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
};

export default MorphingParticles;
