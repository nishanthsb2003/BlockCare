"use client";
import React, { useState, useRef, useEffect } from "react";
import Navigation from "./Navigation";
import HeroContent from "./HeroContent";
import InteractiveRecord from "./InteractiveRecord";
import StatsCards from "./StatsCards";
import ModelViewer from "@/components/ModelViewer";
import DataLossInsights from "./DataLossInsights";
import { Footer } from "@/components/ui/footer";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile on initial load
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state
    checkIfMobile();

    // Add resize listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    // Only add mousemove event listener if not on mobile
    if (isMobile) return;

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
  }, [isMobile]);

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
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
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
      <section
        ref={heroRef}
        className="relative py-12 sm:py-16 md:py-20 lg:py-28 flex-grow"
      >
        {/* Ambient cursor-follow light */}
        <div
          className="pointer-events-none absolute inset-0 opacity-100 transition-all duration-300"
          style={{
            background: isMobile
              ? `radial-gradient(300px circle at 50% 30%, rgb(var(--primary) / 0.08), transparent 40%)`
              : `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgb(var(--primary) / 0.08), transparent 40%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-14 items-center">
            {/* Left Column */}
            <div className="order-2 lg:order-1">
              <HeroContent />
            </div>

            {/* Right Column */}
            <div className="relative order-1 lg:order-2 lg:pl-8 -mt-4 sm:mt-0 flex justify-center lg:justify-start">
              <div className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-none">
                <ModelViewer
                  modelPath={"/models/heart.glb"}
                  height={isMobile ? "300px" : "400px"}
                  autoRotate={true}
                />
              </div>
              {/* <StatsCards /> */}
            </div>
          </div>
        </div>

        {/* Background Decorative Rings - Responsive positioning */}
        <div className="absolute top-1/4 -right-10 w-[16rem] sm:w-[20rem] md:w-[26rem] h-[16rem] sm:h-[20rem] md:h-[26rem] bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-[90px] sm:blur-[110px] -z-10" />
        <div className="absolute bottom-1/4 -left-10 w-[14rem] sm:w-[18rem] md:w-[22rem] h-[14rem] sm:h-[18rem] md:h-[22rem] bg-gradient-to-br from-primary/15 to-background/10 rounded-full blur-[90px] sm:blur-[110px] -z-10" />
      </section>

      {/* Data Loss Insights Section - Responsive Container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <DataLossInsights />
        </div>
      </div>

      {/* Footer */}
      <Footer className="mt-auto" />
    </div>
  );
};

export default Hero;
