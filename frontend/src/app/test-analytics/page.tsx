"use client";

import React from "react";
import Analytics from "@/components/Analytics";
import { Footer } from "@/components/ui/footer";

export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6">Analytics Test Page</h1>
        <div className="max-w-md mx-auto">
          <Analytics />
        </div>
      </div>
      <Footer />
    </div>
  );
}
