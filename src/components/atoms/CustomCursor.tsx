'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [isMoving, setIsMoving] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const scrollPos = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!cursorRef.current || !cubeRef.current) return;

    // Set initial scroll position
    scrollPos.current = window.scrollY;

    const xSetter = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySetter = gsap.quickSetter(cursorRef.current, "y", "px");

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Calculate delta for rotation effect
      const dx = clientX - mousePos.current.x;
      const dy = clientY - mousePos.current.y;
      mousePos.current = { x: clientX, y: clientY };

      xSetter(clientX);
      ySetter(clientY);

      if (!isMoving) {
        setIsMoving(true);
        // Unfold into Isometric view
        gsap.to(cubeRef.current, {
          rotateX: 35,
          rotateY: 45,
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(".cube-face", {
          opacity: 0.8,
          duration: 0.3,
          ease: "power2.out"
        });
      }

      // Logical Directional Rotation
      // X movement rotates Y axis, Y movement rotates X axis
      gsap.to(cubeRef.current, {
        rotateY: `+=${dx * 0.8}`,
        rotateX: `-=${dy * 0.8}`,
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out"
      });

      // Reset to flat state after stopping
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsMoving(false);
        gsap.to(cubeRef.current, {
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        });
        gsap.to(".cube-face:not(.face-front)", {
          opacity: 0,
          duration: 0.4
        });
      }, 150);
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const dScroll = currentScroll - scrollPos.current;
      scrollPos.current = currentScroll;

      // Random tumble effect while maintaining isometric baseline
      gsap.to(cubeRef.current, {
        rotateX: 35 + (dScroll * (0.4 + Math.random() * 0.2)),
        rotateY: 45 + (dScroll * (Math.random() - 0.5) * 0.5),
        rotateZ: (dScroll * (Math.random() - 0.5) * 0.3),
        duration: 0.6,
        ease: "power2.out",
        onStart: () => {
          gsap.to(".cube-face", { opacity: 0.8, duration: 0.2 });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isMoving]);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ marginLeft: '-10px', marginTop: '-10px' }}
    >
      <div 
        ref={cubeRef}
        className="relative w-5 h-5"
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      >
        {/* Cube Faces */}
        <div className="cube-face face-front absolute inset-0 border border-white bg-white/10" style={{ transform: 'translateZ(10px)' }} />
        <div className="cube-face absolute inset-0 border border-white bg-white/5 opacity-0" style={{ transform: 'translateZ(-10px) rotateY(180deg)' }} />
        <div className="cube-face absolute inset-0 border border-white bg-white/5 opacity-0" style={{ transform: 'translateX(-10px) rotateY(-90deg)' }} />
        <div className="cube-face absolute inset-0 border border-white bg-white/5 opacity-0" style={{ transform: 'translateX(10px) rotateY(90deg)' }} />
        <div className="cube-face absolute inset-0 border border-white bg-white/5 opacity-0" style={{ transform: 'translateY(-10px) rotateX(90deg)' }} />
        <div className="cube-face absolute inset-0 border border-white bg-white/5 opacity-0" style={{ transform: 'translateY(10px) rotateX(-90deg)' }} />
      </div>
    </div>
  );
};

export default CustomCursor;
