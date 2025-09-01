"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Database,
  Shield,
  AlertCircle,
  FileWarning,
  Lock,
  ArrowUpRight,
  TrendingDown,
} from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  DarkCard as Card,
  DarkCardContent as CardContent,
  DarkCardDescription as CardDescription,
  DarkCardHeader as CardHeader,
  DarkCardTitle as CardTitle,
  DarkCardFooter as CardFooter,
} from "@/components/ui/dark-card";
import { Button } from "@/components/ui/button";
import Analytics from "./Analytics";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DataLossInsights = () => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Slight delay before showing to ensure smooth animation
          setTimeout(() => {
            setIsVisible(true);
          }, 100);
        }
      },
      {
        root: null,
        rootMargin: "-50px", // Start animation a bit before the element comes into view
        threshold: 0.1,
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  // Data for bar chart: main causes of healthcare data breaches
  const barChartData = {
    labels: [
      "Hacking/IT Incidents",
      "Unauthorized Access",
      "Theft",
      "Loss",
      "Improper Disposal",
    ],
    datasets: [
      {
        label: "Percentage of Breaches",
        data: [58, 17, 10, 8, 7],
        backgroundColor: [
          "rgba(0, 206, 209, 0.8)",
          "rgba(0, 206, 209, 0.8)",
          "rgba(0, 206, 209, 0.8)",
          "rgba(0, 206, 209, 0.8)",
          "rgba(0, 206, 209, 0.8)",
        ],
        borderColor: [
          "rgba(0, 206, 209, 1)",
          "rgba(0, 206, 209, 1)",
          "rgba(0, 206, 209, 1)",
          "rgba(0, 206, 209, 1)",
          "rgba(0, 206, 209, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 70,
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
          borderColor: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.6)",
          callback: function (value: any) {
            return value + "%";
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.6)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        callbacks: {
          label: function (context: any) {
            return `${context.raw}% of breaches`;
          },
        },
      },
    },
  };

  // Blockchain protection statistics
  const protectionStats = [
    {
      icon: <Shield className="h-5 w-5 text-cyan-400" />,
      title: "99.7%",
      description: "Data protection using encryption",
    },
    {
      icon: <Database className="h-5 w-5 text-cyan-400" />,
      title: "0.1%",
      description: "Breach risk with blockchain",
    },
    {
      icon: <Lock className="h-5 w-5 text-cyan-400" />,
      title: "100%",
      description: "Patient consent required",
    },
  ];

  return (
    <div
      ref={componentRef}
      className={`w-full py-12 sm:py-16 md:py-24 lg:py-32 ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-1000`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Secure Your Healthcare Data
            </h2>
            <p className="text-foreground/70 text-base sm:text-lg max-w-2xl mx-auto">
              Every year, over 41 million patient records are compromised in
              data breaches. Take control with BlockCare's blockchain security.
            </p>
          </div>
          <p className="text-center text-foreground/70 text-base mb-12">
            <span className="text-cyan-400 font-medium">
              BlockCare's blockchain technology
            </span>{" "}
            offers a transformative solution for secure, immutable, and
            patient-controlled medical record-keeping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-14 items-stretch">
          {/* Left Column - Bar Chart */}
          <div
            className={`transition-all duration-500 h-full ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <Card className="bg-black border-gray-800 shadow-xl h-full">
              <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
                <div className="flex items-center gap-2 mb-1">
                  <FileWarning className="h-4 w-4 text-red-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-500">
                    Breach Analysis
                  </span>
                </div>
                <CardTitle className="text-white text-base sm:text-lg">
                  Data Breach Causes
                </CardTitle>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">
                  Primary causes of healthcare data breaches in 2025
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="h-[200px] sm:h-[280px]">
                  <Bar data={barChartData} options={barChartOptions} />
                </div>
              </CardContent>
              <CardFooter className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                <p className="text-gray-400">
                  <span className="font-medium">Key finding:</span> Hacking and
                  IT incidents account for
                  <span className="text-cyan-400 font-semibold"> 58%</span> of
                  all healthcare data breaches, making cybersecurity a critical
                  concern for healthcare providers.
                </p>
              </CardFooter>
            </Card>
          </div>

          {/* Right Column - Analytics and Stats */}
          <div className="order-1 md:order-2 space-y-6 sm:space-y-8 h-full flex flex-col">
            {/* Analytics Component */}
            <div
              className={`transition-all duration-500 flex-1 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <Card className="bg-black border-gray-800 shadow-xl h-full">
                <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="h-4 w-4 text-cyan-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                      Security Insights
                    </span>
                  </div>
                  <CardTitle className="text-white text-lg">
                    Healthcare Data Protection
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Analysis of data breaches affecting 500+ individuals
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-0">
                  <div className="h-[200px]">
                    <Analytics />
                  </div>
                  <div className="mt-4 bg-cyan-400/5 p-4 rounded-lg border border-gray-800 flex items-center gap-3">
                    <div className="bg-green-500/10 p-2 rounded-full">
                      <TrendingDown className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-green-500 font-medium">
                        ↓ 302 (40.5%) decrease
                      </p>
                      <p className="text-xs text-gray-400">
                        in data breaches from 2024
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="text-center">
                  <p className="text-xs text-gray-500 w-full">
                    Data source: HIPAA Journal (2009-2025)
                  </p>
                </CardFooter>
              </Card>
            </div>

            {/* Protection Stats Cards */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              {protectionStats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-black border border-gray-800 shadow-xl p-3 sm:p-4"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-cyan-400/10 p-1.5 sm:p-2 rounded-full mb-2 sm:mb-3">
                      {stat.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {stat.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div
              className={`transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-black py-3 sm:py-4 md:py-5 rounded-lg font-semibold text-sm sm:text-base hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-200">
                <span>Protect Your Medical Records Now</span>
                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataLossInsights;
