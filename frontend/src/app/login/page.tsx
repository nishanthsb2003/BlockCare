"use client";
import React, { useState } from "react";
import {
  User,
  Building2,
  ArrowLeft,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";

interface RoleCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  colorScheme: "primary" | "accent";
  isSelected: boolean;
  onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  features,
  icon,
  colorScheme,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer rounded-2xl p-6 transition-all duration-300 border-2 
        ${
          isSelected
            ? `border-${colorScheme} shadow-lg scale-[1.02]`
            : "border-border hover:border-foreground/30"
        }
      `}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4">
          <CheckCircle className={`h-5 w-5 text-${colorScheme}`} />
        </div>
      )}

      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div
          className={`h-20 w-20 flex items-center justify-center rounded-full border-2 border-${colorScheme}/30 bg-${colorScheme}/10`}
        >
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-sm text-center text-foreground/60 mb-4">
        {description}
      </p>

      {/* Features */}
      <ul className="space-y-2 text-sm">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full bg-${colorScheme}`} />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<
    "patient" | "hospital" | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const roles = [
    {
      key: "patient" as const,
      title: "Patient",
      description:
        "Access your medical records, manage consent, and share health data securely.",
      features: [
        "View medical history",
        "Manage data sharing",
        "Track consent status",
      ],
      icon: <User className="h-10 w-10 text-primary" />,
      colorScheme: "primary" as const,
    },
    {
      key: "hospital" as const,
      title: "Hospital",
      description:
        "Manage patient records and access authorized health information securely.",
      features: [
        "Update patient records",
        "Access patient data",
        "Manage staff access",
      ],
      icon: <Building2 className="h-10 w-10 text-accent" />,
      colorScheme: "accent" as const,
    },
  ];

  const handleContinue = async () => {
    if (!selectedRole) return;
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    router.push(`/${selectedRole}/dashboard`);
  };

  return (
    <>
      <Head>
        <title>Choose Your Role - BlockCare</title>
        <meta
          name="description"
          content="Select your role to access BlockCare securely."
        />
      </Head>

      <div className="min-h-screen bg-background flex flex-col">
        {/* Back Navigation */}
        <div className="p-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>

        {/* Main */}
        <main className="flex-1 flex flex-col items-center justify-center px-4">
          <h1 className="text-3xl font-bold text-center mb-2">
            Choose Your Role
          </h1>
          <p className="text-foreground/60 mb-10 text-center">
            Select how you want to access BlockCare
          </p>

          <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
            {roles.map((role) => (
              <RoleCard
                key={role.key}
                title={role.title}
                description={role.description}
                features={role.features}
                icon={role.icon}
                colorScheme={role.colorScheme}
                isSelected={selectedRole === role.key}
                onClick={() => setSelectedRole(role.key)}
              />
            ))}
          </div>

          {selectedRole && (
            <button
              onClick={handleContinue}
              disabled={isLoading}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  Continue as{" "}
                  {selectedRole === "patient" ? "Patient" : "Hospital"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          )}

          <p className="mt-6 text-xs text-foreground/50">
            Both roles use blockchain for secure, tamper-proof medical data
            management.
          </p>
        </main>

        <footer className="p-4 text-center text-xs text-foreground/40">
          © 2024 BlockCare. HIPAA compliant blockchain health records.
        </footer>
      </div>
    </>
  );
};

export default LoginPage;
