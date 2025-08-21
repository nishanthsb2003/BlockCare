"use client";
import React from "react";

const StatsCards = () => {
  return (
    <>
      {/* Records Secured */}
      <div className="hidden md:block absolute -left-10 top-1/3">
        <div className="backdrop-blur-md bg-foreground/5 border border-border rounded-2xl px-5 py-4 shadow-[0_10px_40px_-10px_rgb(var(--primary)/0.45)]">
          <div className="text-xs text-foreground/60">
            Records Secured
          </div>
          <div className="text-3xl font-bold text-foreground mt-1">
            2.3M+
          </div>
        </div>
      </div>

      {/* Providers Connected */}
      <div className="hidden md:block absolute -right-8 bottom-8">
        <div className="backdrop-blur-md bg-foreground/5 border border-border rounded-2xl px-5 py-4 shadow-[0_10px_40px_-10px_rgb(var(--primary)/0.45)] text-right">
          <div className="text-xs text-foreground/60">
            Providers Connected
          </div>
          <div className="text-3xl font-bold text-foreground mt-1">
            8,400+
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsCards;
