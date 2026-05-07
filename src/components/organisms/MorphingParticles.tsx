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

  // Shape 1: Square (2D flat grid with slight depth)
  const squarePositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const size = 10;
    const side = Math.floor(Math.sqrt(count));
    for (let i = 0; i < count; i++) {
      const x = ((i % side) / side - 0.5) * size;
      const y = (Math.floor(i / side) / side - 0.5) * size;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5; // Slight depth for texture
    }
    return pos;
  }, []);

  // Shape 2: Sphere
  const spherePositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 4;
      pos[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  // Shape 3: Cube (Points scattered on the 6 surfaces)
  const cubePositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const size = 6;
    for (let i = 0; i < count; i++) {
      const face = i % 6;
      const u = (Math.random() - 0.5) * size;
      const v = (Math.random() - 0.5) * size;
      const d = size / 2;

      let x = 0, y = 0, z = 0;
      if (face === 0) { x = d; y = u; z = v; }
      else if (face === 1) { x = -d; y = u; z = v; }
      else if (face === 2) { x = u; y = d; z = v; }
      else if (face === 3) { x = u; y = -d; z = v; }
      else if (face === 4) { x = u; y = v; z = d; }
      else { x = u; y = v; z = -d; }

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  // Shape 4: Tesseract (3D Perspective Projection of a 4D Hypercube)
  const tesseractPositions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    // 1. Generate the 16 vertices of a 4D hypercube
    const vertices = [];
    for (let i = 0; i < 16; i++) {
      const x = (i & 1) ? 1 : -1;
      const y = (i & 2) ? 1 : -1;
      const z = (i & 4) ? 1 : -1;
      const w = (i & 8) ? 1 : -1;

      // Perspective projection from 4D to 3D
      const distance = 2.5;
      const perspective = 1 / (distance - w);

      // Scale up for visual presence
      const scale = 4.5;
      vertices.push([x * perspective * scale, y * perspective * scale, z * perspective * scale]);
    }

    // 2. Generate the 32 edges connecting the 16 vertices
    const edges = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        const xor = i ^ j;
        // Connect vertices if they differ by exactly one coordinate
        if (xor === 1 || xor === 2 || xor === 4 || xor === 8) {
          edges.push([i, j]);
        }
      }
    }

    // 3. Scatter particles evenly along the 32 edges
    for (let i = 0; i < count; i++) {
      const edgeIndex = i % 32;
      const edge = edges[edgeIndex];
      const v1 = vertices[edge[0]];
      const v2 = vertices[edge[1]];

      // Random position along the specific edge
      const t = Math.random();

      pos[i * 3] = v1[0] + (v2[0] - v1[0]) * t;
      pos[i * 3 + 1] = v1[1] + (v2[1] - v1[1]) * t;
      pos[i * 3 + 2] = v1[2] + (v2[2] - v1[2]) * t;
    }
    return pos;
  }, []);

  // Collection of all shape frames
  const shapes = useMemo(() => [
    squarePositions,
    spherePositions,
    cubePositions,
    tesseractPositions
  ], [squarePositions, spherePositions, cubePositions, tesseractPositions]);

  // Current positions initialized to the first shape
  const currentPositions = useMemo(() => new Float32Array(squarePositions), [squarePositions]);

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
      progress: 3, // 0 = Square, 1 = Sphere, 2 = Cube, 3 = Tesseract
      scrollTrigger: {
        trigger: "#root-layout",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
      onUpdate: () => {
        if (!pointsRef.current) return;
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        const p = obj.progress;
        const startIndex = Math.min(Math.floor(p), shapes.length - 2);
        const targetIndex = startIndex + 1;
        const lerpFactor = p - startIndex;

        const startShape = shapes[startIndex];
        const targetShape = shapes[targetIndex];

        for (let i = 0; i < count * 3; i++) {
          positions[i] = THREE.MathUtils.lerp(
            startShape[i],
            targetShape[i],
            lerpFactor
          );
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
      }
    });
  }, [shapes]);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const time = timeRef.current;
    if (pointsRef.current) {
      const targetRotationY = time * 0.10 + (mouse.current.x * 1.0);
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
        opacity={0.9}
      />
    </Points>
  );
};

export default MorphingParticles;
