"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const GRID_SIZE = 16;
const PARTICLE_SIZE = 2.5;
const INTERACTION_RADIUS = 120;

type Particle = {
  x: number;
  y: number;
  initialX: number;
  initialY: number;
  angle: number;
};

export const MagneticParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      const spacingX = canvas.width / (GRID_SIZE + 1);
      const spacingY = canvas.height / (GRID_SIZE + 1);

      particlesRef.current = [];
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          const x = spacingX * (j + 1);
          const y = spacingY * (i + 1);
          particlesRef.current.push({ 
            x, 
            y, 
            initialX: x, 
            initialY: y,
            angle: 0 
          });
        }
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mx = mouseX.get();
      const my = mouseY.get();

      particlesRef.current.forEach((p) => {
        // Calculate angle to mouse (like metal filings)
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < INTERACTION_RADIUS && mx !== Infinity) {
          p.angle = Math.atan2(dy, dx);
        } else {
          // Gently fade angle back to 0
          p.angle *= 0.95;
        }

        // Position particles slightly toward mouse direction
        const influence = Math.max(0, (INTERACTION_RADIUS - dist) / INTERACTION_RADIUS) * 0.8;
        p.x = p.initialX + Math.cos(p.angle) * influence * 8;
        p.y = p.initialY + Math.sin(p.angle) * influence * 8;

        // Draw rotated filing-like particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        
        ctx.fillStyle = `rgba(255, 215, 0, ${0.6 + influence * 0.4})`;
        ctx.shadowColor = 'rgba(255, 215, 0, 0.6)';
        ctx.shadowBlur = 4;
        
        // Draw thin rectangle (like metal filing)
        ctx.fillRect(-PARTICLE_SIZE/2, -1.5, PARTICLE_SIZE, 3);
        ctx.restore();
      });

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
    mouseY.set(Infinity);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};
