'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const innerCubeRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Use refs for values needed inside event listeners without recreating them
  const isHoveringRef = useRef(false);
  const isMovingRef = useRef(false);
  const isClickingRef = useRef(false);

  const hoverRotationTween = useRef<gsap.core.Tween | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const scrollPos = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!cursorRef.current || !cubeRef.current) return;

    scrollPos.current = window.scrollY;

    const xSetter = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySetter = gsap.quickSetter(cursorRef.current, "y", "px");

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const dx = clientX - mousePos.current.x;
      const dy = clientY - mousePos.current.y;
      mousePos.current = { x: clientX, y: clientY };

      xSetter(clientX);
      ySetter(clientY);

      if (!isMovingRef.current) {
        isMovingRef.current = true;
        if (!isHoveringRef.current) {
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
      }

      // Logical Directional Rotation
      // Don't interfere if continuous hover rotation is active
      if (!hoverRotationTween.current || !hoverRotationTween.current.isActive()) {
        gsap.to(cubeRef.current, {
          rotateY: `+=${dx * 0.8}`,
          rotateX: `-=${dy * 0.8}`,
          scale: isClickingRef.current ? 0.6 : (isHoveringRef.current ? 1.5 : 1.1),
          duration: 0.5,
          ease: "power2.out"
        });
      }

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        isMovingRef.current = false;
        if (!isHoveringRef.current) {
          gsap.to(cubeRef.current, {
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: isClickingRef.current ? 0.6 : 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
          });
          gsap.to(".cube-face:not(.face-front)", {
            opacity: 0,
            duration: 0.4
          });
        }
      }, 150);
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const dScroll = currentScroll - scrollPos.current;
      scrollPos.current = currentScroll;

      if (!isMovingRef.current) {
        isMovingRef.current = true;
        if (!isHoveringRef.current) {
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
      }

      if (!hoverRotationTween.current || !hoverRotationTween.current.isActive()) {
        gsap.to(cubeRef.current, {
          rotateX: `+=${dScroll * 0.5}`,
          rotateY: `+=${dScroll * (Math.random() - 0.5) * 0.2}`,
          rotateZ: `+=${dScroll * (Math.random() - 0.5) * 0.2}`,
          duration: 0.1,
          ease: "none",
          overwrite: "auto"
        });
      }

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        isMovingRef.current = false;
        if (!isHoveringRef.current) {
          gsap.to(cubeRef.current, {
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: isClickingRef.current ? 0.6 : 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
          });
          gsap.to(".cube-face:not(.face-front)", {
            opacity: 0,
            duration: 0.4
          });
        }
      }, 150);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let isClickable = !!(target.closest('a') || target.closest('button'));

      if (!isClickable) {
        try {
          isClickable = window.getComputedStyle(target).cursor === 'pointer';
        } catch (err) {
          // Ignore cross-origin stylesheet errors if any
        }
      }

      if (isClickable && !isHoveringRef.current) {
        isHoveringRef.current = true;
        setIsHovering(true);
      } else if (!isClickable && isHoveringRef.current) {
        isHoveringRef.current = false;
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => {
      isClickingRef.current = true;
      // Instant "squish" effect
      gsap.to(cubeRef.current, {
        scale: 0.6,
        duration: 0.1,
        ease: "power2.out"
      });
      if (isHoveringRef.current && innerCubeRef.current) {
        gsap.to(innerCubeRef.current, {
          scale: 0.01,
          duration: 0.1,
          ease: "power2.out"
        });
      }
    };

    const handleMouseUp = () => {
      isClickingRef.current = false;
      // High-energy bounce back to target scale
      const targetScale = isHoveringRef.current ? 1.2 : (isMovingRef.current ? 1.1 : 1);
      gsap.to(cubeRef.current, {
        scale: targetScale,
        duration: 0.6,
        ease: "elastic.out(1.2, 0.4)"
      });
      if (isHoveringRef.current && innerCubeRef.current) {
        gsap.to(innerCubeRef.current, {
          scale: 0.5,
          duration: 0.6,
          ease: "elastic.out(1.2, 0.4)"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Hover Effect Animation
  useEffect(() => {
    if (!cubeRef.current || !innerCubeRef.current) return;

    if (isHovering) {
      // Ensure all outer faces are visible
      gsap.to(".cube-face", { opacity: 0.8, duration: 0.3, ease: "power2.out" });

      // Scale up outer cube initially
      gsap.to(cubeRef.current, { scale: 1.5, duration: 0.4, ease: "back.out(1.5)" });

      // Show inner cube (Tesseract Core)
      gsap.to(innerCubeRef.current, {
        scale: 0.5,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.5)"
      });

      // Slightly reduce scale to compensate for 3D optical expansion
      gsap.to(cubeRef.current, {
        scale: 1.2,
        duration: 0.5,
        delay: 0.4,
        ease: "power2.out"
      });

      // Smooth continuous rotation after a delay
      hoverRotationTween.current = gsap.to(cubeRef.current, {
        rotateX: "+=180",
        rotateY: "+=180",
        rotateZ: "+=90",
        duration: 4,
        ease: "linear",
        repeat: -1,
        delay: 0.4 // Delay before starting smooth rotation
      });
    } else {
      // Kill continuous rotation
      if (hoverRotationTween.current) {
        hoverRotationTween.current.kill();
        hoverRotationTween.current = null;
      }

      // Hide inner cube
      gsap.to(innerCubeRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });

      // Handle outer cube based on whether we are still moving
      if (isMovingRef.current) {
        gsap.to(cubeRef.current, { scale: 1.1, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(cubeRef.current, {
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        });
        gsap.to(".cube-face:not(.face-front)", { opacity: 0, duration: 0.4 });
      }
    }
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-5 h-5 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ marginLeft: '-10px', marginTop: '-10px', perspective: '1000px' }}
    >
      <div
        ref={cubeRef}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Outer Cube Faces */}
        <div className="cube-face face-front absolute inset-0 border border-white bg-white/10" style={{ transform: 'translateZ(10px)' }} />
        <div className="cube-face absolute inset-0 border border-white bg-white/5 opacity-0" style={{ transform: 'translateZ(-10px) rotateY(180deg)' }} />
        <div className="cube-face absolute inset-0 border border-white bg-white/5 opacity-0" style={{ transform: 'translateX(-10px) rotateY(-90deg)' }} />
        <div className="cube-face absolute inset-0 border border-white bg-white/5 opacity-0" style={{ transform: 'translateX(10px) rotateY(90deg)' }} />
        <div className="cube-face absolute inset-0 border border-white bg-white/5 opacity-0" style={{ transform: 'translateY(-10px) rotateX(90deg)' }} />
        <div className="cube-face absolute inset-0 border border-white bg-white/5 opacity-0" style={{ transform: 'translateY(10px) rotateX(-90deg)' }} />

        {/* Inner Cube (Tesseract Core) */}
        <div
          ref={innerCubeRef}
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d', transform: 'scale(0)', opacity: 0 }}
        >
          <div className="inner-cube-face absolute inset-0 border border-white bg-white/20" style={{ transform: 'translateZ(10px)' }} />
          <div className="inner-cube-face absolute inset-0 border border-white bg-white/20" style={{ transform: 'translateZ(-10px) rotateY(180deg)' }} />
          <div className="inner-cube-face absolute inset-0 border border-white bg-white/20" style={{ transform: 'translateX(-10px) rotateY(-90deg)' }} />
          <div className="inner-cube-face absolute inset-0 border border-white bg-white/20" style={{ transform: 'translateX(10px) rotateY(90deg)' }} />
          <div className="inner-cube-face absolute inset-0 border border-white bg-white/20" style={{ transform: 'translateY(-10px) rotateX(90deg)' }} />
          <div className="inner-cube-face absolute inset-0 border border-white bg-white/20" style={{ transform: 'translateY(10px) rotateX(-90deg)' }} />
        </div>
      </div>
    </div>
  );
};

export default CustomCursor;
