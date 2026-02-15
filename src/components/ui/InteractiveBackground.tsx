"use client";

import React, { useEffect, useRef } from "react";

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particlesArray: Particle[] = [];

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 0,
      targetRadius: 0,
      currentRadius: 0,
    };

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouse.targetRadius = (canvas.height / 80) * (canvas.width / 80);
      init();
    };

    let mouseTimeout: NodeJS.Timeout;

    const handleMouseMove = (event: MouseEvent) => {
      // Optimization: Don't process mouse events if canvas is not visible
      if (!isVisibleRef.current) return;

      // Throttle logic inside requestAnimationFrame
      requestAnimationFrame(() => {
         mouse.x = event.x;
         mouse.y = event.y;
         mouse.currentRadius = mouse.targetRadius; 
      });

      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        // mouse.currentRadius will be handled in animate loop for smooth fade
      }, 100);
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
      mouse.currentRadius = 0;
    };

    window.addEventListener("resize", updateCanvasSize);
    // Note: We'll attach mousemove listener but optimize inside it
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;

      constructor(
        x: number,
        y: number,
        directionX: number,
        directionY: number,
        size: number,
        color: string
      ) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(142, 158, 171, 0.8)"; // Slightly transparent particles
        ctx.fill();
      }

      update() {
        if (!canvas) return;
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        if (mouse.x !== null && mouse.y !== null) {
          // Adjust mouse coordinates relative to the canvas/hero section
          const rect = canvas.getBoundingClientRect();
          const relativeX = mouse.x - rect.left;
          const relativeY = mouse.y - rect.top;

          let dx = relativeX - this.x;
          let dy = relativeY - this.y;
          // Optimization: Pre-check distance components to avoid sqrt
          if (Math.abs(dx) < mouse.currentRadius + 50 && Math.abs(dy) < mouse.currentRadius + 50) {
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.currentRadius + this.size) {
              if (relativeX < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 3;
              }
              if (relativeX > this.x && this.x > this.size * 10) {
                this.x -= 3;
              }
              if (relativeY < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 3;
              }
              if (relativeY > this.y && this.y > this.size * 10) {
                this.y -= 3;
              }
            }
          }
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      particlesArray = [];
      // Optimization: Hard cap on particles for performance
      let calculatedParticles = (canvas!.height * canvas!.width) / 15000;
      let numberOfParticles = Math.min(calculatedParticles, 100); // Cap at 100
      
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 0.5;
        let x = Math.random() * (canvas!.width - size * 4) + size * 2;
        let y = Math.random() * (canvas!.height - size * 4) + size * 2;
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        let color = "#8E9EAB";

        particlesArray.push(
          new Particle(x, y, directionX, directionY, size, color)
        );
      }
    }

    function connect() {
      if (!ctx || !canvas) return;
      const maxDistance = 150;
      const maxDistanceSquared = maxDistance * maxDistance;

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          // Optimization: Fast reject based on X and Y distance
          let dx = particlesArray[a].x - particlesArray[b].x;
          if (Math.abs(dx) > maxDistance) continue;
          
          let dy = particlesArray[a].y - particlesArray[b].y;
          if (Math.abs(dy) > maxDistance) continue;

          let distance = dx * dx + dy * dy;
          
          if (distance < maxDistanceSquared) {
            const opacityValue = 1 - distance / maxDistanceSquared;
            ctx.strokeStyle = "rgba(142, 158, 171," + opacityValue * 0.2 + ")"; // Subtler lines
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    let lastMouseMoveTime = Date.now();
    const idleThreshold = 150; // ms before starting to fade out

    const handleMouseMoveWithTime = (event: MouseEvent) => {
      handleMouseMove(event);
      lastMouseMoveTime = Date.now();
    };

    function animate() {
      if (!ctx || !canvas) return;
      if (!isVisibleRef.current) return;

      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smoothly fade out the radius if mouse is idle
      const timeSinceLastMove = Date.now() - lastMouseMoveTime;
      if (timeSinceLastMove > idleThreshold) {
        mouse.currentRadius *= 0.95; // Smooth shrink
        if (mouse.currentRadius < 0.1) mouse.currentRadius = 0;
      }

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    }

    updateCanvasSize();

    // Optimization: manage listeners based on visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only run animation when clearly visible (intersecting > 0)
        if (entry.isIntersecting) {
          if (!isVisibleRef.current) {
            isVisibleRef.current = true;
            window.addEventListener("mousemove", handleMouseMoveWithTime, { passive: true });
            animate();
          }
        } else {
          if (isVisibleRef.current) {
            isVisibleRef.current = false;
            window.removeEventListener("mousemove", handleMouseMoveWithTime);
          }
        }
      },
      { threshold: 0.01 } // Trigger as soon as 1% is visible, stop when 0%
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMoveWithTime); // Cleanup safety
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40"
      style={{
        background: "transparent",
      }}
    />
  );
}
