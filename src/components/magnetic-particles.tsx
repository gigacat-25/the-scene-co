"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const GRID_SIZE = 30;
const PARTICLE_SIZE = 4;
const INTERACTION_RADIUS = 120;
const DAMPING = 0.1;
const REPULSION_STRENGTH = 0.5;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  initialX: number;
  initialY: number;
};

export const MagneticParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = {
    x: useMotionValue(Infinity),
    y: useMotionValue(Infinity),
  };
  const particlesRef = useRef<Particle[]>([]);

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
                particlesRef.current.push({ x, y, vx: 0, vy: 0, initialX: x, initialY: y });
            }
        }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);


    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouse.x.get();
      const my = mouse.y.get();

      particlesRef.current.forEach((p) => {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Magnetic pull towards cursor
        if (dist < INTERACTION_RADIUS) {
            const angle = Math.atan2(dy, dx);
            const force = (INTERACTION_RADIUS - dist) * REPULSION_STRENGTH * -0.01;
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
        }

        // Return to initial position
        p.vx += (p.initialX - p.x) * DAMPING * 0.05;
        p.vy += (p.initialY - p.y) * DAMPING * 0.05;
        
        // Damping
        p.vx *= (1 - DAMPING);
        p.vy *= (1 - DAMPING);

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, PARTICLE_SIZE / 2, 0, Math.PI * 2);
        
        // Color based on distance
        const distanceToCenter = Math.sqrt(Math.pow(p.x - canvas.width/2, 2) + Math.pow(p.y - canvas.height/2, 2));
        const maxDist = Math.sqrt(Math.pow(canvas.width/2, 2) + Math.pow(canvas.height/2, 2));
        const opacity = Math.max(0, 1 - distanceToCenter / maxDist) * 0.7 + 0.1;
        
        ctx.fillStyle = `rgba(230, 182, 92, ${opacity})`; // Champagne Gold with opacity
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mouse.x, mouse.y]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.x.set(e.clientX - rect.left);
    mouse.y.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouse.x.set(Infinity);
    mouse.y.set(Infinity);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 z-0 bg-background"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};
