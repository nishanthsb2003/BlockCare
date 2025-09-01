"use client";

import React from "react";
import DataLossInsights from "@/components/DataLossInsights";
import { Footer } from "@/components/ui/footer";

export default function TestPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <div className="p-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6">Data Loss Insights Test Page</h1>
        <div className="w-full">
          <DataLossInsights />
        </div>
      </div>
      <Footer />
    </div>
  );
}
