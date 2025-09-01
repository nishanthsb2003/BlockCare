"use client";

import React from "react";
import DataLossInsights from "@/components/DataLossInsights";
import { Footer } from "@/components/ui/footer";

export default function TestPage() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <div className="flex-grow">
        <DataLossInsights />
      </div>
      <Footer className="bg-black text-white border-gray-800" />
    </div>
  );
}
