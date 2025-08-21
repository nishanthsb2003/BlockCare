"use client";
import React, { useState, useRef, useEffect } from "react";
import Navigation from "./Navigation";
import HeroContent from "./HeroContent";
import InteractiveRecord from "./InteractiveRecord";
import StatsCards from "./StatsCards";
import ModelViewer from "@/components/ModelViewer";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove);
      return () => hero.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const GrainOverlay = () => (
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }}
    />
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <GrainOverlay />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(rgb(var(--foreground) / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--foreground) / 0.05) 1px, transparent 1px)`,
          backgroundSize: "36px 36px, 36px 36px",
          backgroundPosition: "-18px -18px, -18px -18px",
        }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 lg:py-28">
        {/* Ambient cursor-follow light */}
        <div
          className="pointer-events-none absolute inset-0 opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgb(var(--primary) / 0.08), transparent 40%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left Column */}
            <HeroContent />

            {/* Right Column */}
            <div className="relative lg:pl-8">
              <ModelViewer modelPath={"/models/heart.glb"} />
              {/* <StatsCards /> */}
            </div>
          </div>
        </div>

        {/* Background Decorative Rings */}
        <div className="absolute top-1/4 -right-10 w-[26rem] h-[26rem] bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-[110px] -z-10" />
        <div className="absolute bottom-1/4 -left-10 w-[22rem] h-[22rem] bg-gradient-to-br from-primary/15 to-background/10 rounded-full blur-[110px] -z-10" />
      </section>
    </div>
  );
};

export default Hero;
