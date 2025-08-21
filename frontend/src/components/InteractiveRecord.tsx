"use client";
import React from "react";
import {
  Database,
  Lock,
  Activity,
  Heart,
  Stethoscope,
  Pill,
  Syringe,
  Microscope,
  Brain,
  Dna,
} from "lucide-react";

interface InteractiveRecordProps {
  mousePosition: { x: number; y: number };
}

const InteractiveRecord: React.FC<InteractiveRecordProps> = ({
  mousePosition,
}) => {
  return (
    <div className="relative group">
      {/* Main Record Container */}
      <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Enhanced 3D Glow Backdrops */}
        <div className="absolute -top-20 left-1/4 h-64 w-64 bg-primary/15 blur-[70px] rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 h-32 w-32 bg-secondary/10 blur-[60px] rounded-full animate-pulse" />

        {/* Additional medical-themed glow effects */}
        <div
          className="absolute top-1/3 right-1/3 h-24 w-24 bg-destructive/20 blur-[50px] rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 h-20 w-20 bg-accent/25 blur-[40px] rounded-full animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />

        {/* 3D Medical Equipment Models */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Stethoscope */}
          <div
            className="absolute top-8 right-12 transform rotate-12"
            style={{
              transform: `perspective(1000px) rotateX(${
                (mousePosition.y - 50) * 0.05
              }deg) rotateY(${
                (mousePosition.x - 50) * 0.08
              }deg) rotateZ(12deg)`,
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse" />
              <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 p-3 rounded-2xl border border-primary/30 shadow-lg backdrop-blur-sm">
                <Stethoscope className="h-8 w-8 text-primary drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* Floating Pill Bottle */}
          <div
            className="absolute top-16 left-8 transform -rotate-6"
            style={{
              transform: `perspective(1000px) rotateX(${
                (mousePosition.y - 50) * 0.04
              }deg) rotateY(${
                (mousePosition.x - 50) * 0.06
              }deg) rotateZ(-6deg)`,
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-lg rounded-full animate-pulse" />
              <div className="relative bg-gradient-to-br from-accent/20 to-secondary/20 p-3 rounded-2xl border border-accent/30 shadow-lg backdrop-blur-sm">
                <Pill className="h-8 w-8 text-accent drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* Floating Syringe */}
          <div
            className="absolute bottom-20 right-8 transform rotate-45"
            style={{
              transform: `perspective(1000px) rotateX(${
                (mousePosition.y - 50) * 0.03
              }deg) rotateY(${
                (mousePosition.x - 50) * 0.05
              }deg) rotateZ(45deg)`,
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-destructive/20 blur-lg rounded-full animate-pulse" />
              <div className="relative bg-gradient-to-br from-destructive/20 to-primary/20 p-3 rounded-2xl border border-destructive/30 shadow-lg backdrop-blur-sm">
                <Syringe className="h-8 w-8 text-destructive drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* Floating Microscope */}
          <div
            className="absolute bottom-16 left-16 transform -rotate-12"
            style={{
              transform: `perspective(1000px) rotateX(${
                (mousePosition.y - 50) * 0.06
              }deg) rotateY(${
                (mousePosition.x - 50) * 0.09
              }deg) rotateZ(-12deg)`,
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/20 blur-lg rounded-full animate-pulse" />
              <div className="relative bg-gradient-to-br from-secondary/20 to-accent/20 p-3 rounded-2xl border border-secondary/30 shadow-lg backdrop-blur-sm">
                <Microscope className="h-8 w-8 text-secondary drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* Floating Brain Icon */}
          <div
            className="absolute top-24 left-1/2 transform rotate-3"
            style={{
              transform: `perspective(1000px) rotateX(${
                (mousePosition.y - 50) * 0.04
              }deg) rotateY(${(mousePosition.x - 50) * 0.07}deg) rotateZ(3deg)`,
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse" />
              <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 p-3 rounded-2xl border border-primary/30 shadow-lg backdrop-blur-sm">
                <Brain className="h-8 w-8 text-primary drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* Floating DNA Helix */}
          <div
            className="absolute top-32 right-1/4 transform -rotate-15"
            style={{
              transform: `perspective(1000px) rotateX(${
                (mousePosition.y - 50) * 0.05
              }deg) rotateY(${
                (mousePosition.x - 50) * 0.08
              }deg) rotateZ(-15deg)`,
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-lg rounded-full animate-pulse" />
              <div className="relative bg-gradient-to-br from-accent/20 to-primary/20 p-3 rounded-2xl border border-accent/30 shadow-lg backdrop-blur-sm">
                <Dna className="h-8 w-8 text-accent drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Header */}
        <div className="relative mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl border border-primary/30">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Medical Record</h3>
                <p className="text-xs text-foreground/60">
                  BlockCare ID: BC-2024-001
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-xl border border-accent/30">
                <Lock className="h-5 w-5 text-accent" />
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-foreground">Encrypted</p>
                <p className="text-xs text-foreground/60">AES-256</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Patient Info */}
        <div className="relative mb-6 p-4 bg-gradient-to-br from-background/50 to-card/30 rounded-2xl border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-foreground">
              Patient Information
            </h4>
            <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-foreground/60">Name</p>
              <p className="font-medium text-foreground">John Doe</p>
            </div>
            <div>
              <p className="text-foreground/60">DOB</p>
              <p className="font-medium text-foreground">1985-03-15</p>
            </div>
            <div>
              <p className="text-foreground/60">Blood Type</p>
              <p className="font-medium text-foreground">O+</p>
            </div>
            <div>
              <p className="text-foreground/60">Allergies</p>
              <p className="font-medium text-foreground">Penicillin</p>
            </div>
          </div>
        </div>

        {/* Enhanced Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Vital Signs */}
          <div className="p-4 bg-gradient-to-br from-background/50 to-card/30 rounded-2xl border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="h-5 w-5 text-destructive animate-pulse" />
              <h5 className="font-semibold text-foreground">Vital Signs</h5>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/60">BP</span>
                <span className="font-medium text-foreground">120/80</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">HR</span>
                <span className="font-medium text-foreground">72 bpm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Temp</span>
                <span className="font-medium text-foreground">98.6°F</span>
              </div>
            </div>
          </div>

          {/* Lab Results */}
          <div className="p-4 bg-gradient-to-br from-background/50 to-card/30 rounded-2xl border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-5 w-5 text-accent" />
              <h5 className="font-semibold text-foreground">Lab Results</h5>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-foreground/60">Cholesterol</span>
                  <span className="font-medium text-foreground">180 mg/dL</span>
                </div>
                <div className="w-full bg-foreground/10 rounded-full h-1.5">
                  <div
                    className="bg-accent h-1.5 rounded-full"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-foreground/60">Glucose</span>
                  <span className="font-medium text-foreground">95 mg/dL</span>
                </div>
                <div className="w-full bg-foreground/10 rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: "45%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Consent Management */}
        <div className="mb-6 p-4 bg-gradient-to-br from-background/50 to-card/30 rounded-2xl border border-border/50">
          <h5 className="font-semibold text-foreground mb-3">
            Consent Management
          </h5>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground/70">Data Sharing</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-foreground/10 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
                <span className="text-xs text-foreground/60">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground/70">
                Research Access
              </span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-foreground/10 rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full"
                    style={{ width: "45%" }}
                  />
                </div>
                <span className="text-xs text-foreground/60">45%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced HUD Strip */}
        <div className="relative p-3 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-xl border border-primary/20">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
              <span className="text-foreground/70">Network Status</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-foreground/60">
                Last Updated: 2 min ago
              </span>
              <span className="text-foreground/60">Version: 2.1.4</span>
            </div>
          </div>
        </div>

        {/* Enhanced Gloss Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl pointer-events-none" />

        {/* Animated Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 bg-primary/30 rounded-full animate-ping"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: "3s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveRecord;
