"use client";
import type React from "react";
import { useState } from "react";
import {
  User,
  Building2,
  ArrowLeft,
  CheckCircle,
  ArrowRight,
  Shield,
  Heart,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RoleCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  isPrimary: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  features,
  icon,
  isPrimary,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer rounded-xl p-8 transition-all duration-300 border-2 hover:shadow-xl hover:-translate-y-1
        ${
          isSelected
            ? "border-primary shadow-xl scale-[1.02] bg-card ring-2 ring-primary/20"
            : "border-border hover:border-primary/50 bg-card hover:shadow-lg"
        }
      `}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-primary rounded-full p-2 shadow-lg animate-in zoom-in-50 duration-300">
          <CheckCircle className="h-5 w-5 text-primary-foreground" />
        </div>
      )}

      <div className="flex justify-center mb-6">
        <div
          className={`h-24 w-24 flex items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110
            ${
              isPrimary
                ? "bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30"
                : "bg-gradient-to-br from-secondary to-muted border-2 border-border"
            }
          `}
        >
          <div
            className={`transition-colors ${
              isPrimary ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {icon}
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-center mb-3 text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-base text-center text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p>

      <ul className="space-y-3 text-sm">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-foreground">
            <div
              className={`h-2 w-2 rounded-full flex-shrink-0 transition-colors
                ${isPrimary ? "bg-primary" : "bg-accent"}
              `}
            />
            <span className="font-medium">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
        "Securely access your medical records, manage consent preferences, and control your health data with blockchain technology.",
      features: [
        "View complete medical history",
        "Manage data sharing permissions",
        "Track consent status in real-time",
        "Secure blockchain verification",
      ],
      icon: <User className="h-12 w-12" />,
      isPrimary: true,
    },
    {
      key: "hospital" as const,
      title: "Hospital",
      description:
        "Manage patient records with enterprise-grade security and access authorized health information through our HIPAA-compliant platform.",
      features: [
        "Update patient records securely",
        "Access authorized patient data",
        "Manage staff permissions",
        "Blockchain audit trails",
      ],
      icon: <Building2 className="h-12 w-12" />,
      isPrimary: false,
    },
  ];

  const handleContinue = async () => {
    if (!selectedRole) return;
    setIsLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 1500));
      // Redirect based on selected role
      if (selectedRole === "patient") {
        router.push("/login/user");
      } else if (selectedRole === "hospital") {
        router.push("/login/doctor");
      }
    } catch (error) {
      console.error("Navigation failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30">
      <header className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        <div className="relative p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Choose Your Role
              </h1>
              <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-accent" />
              </div>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Access BlockCare's secure, blockchain-powered healthcare platform
              designed for both patients and healthcare providers
            </p>

            <div className="flex justify-center items-center gap-8 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <span className="font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="font-medium">Blockchain Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-accent" />
                <span className="font-medium">Patient-Centered</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
            {roles.map((role) => (
              <RoleCard
                key={role.key}
                title={role.title}
                description={role.description}
                features={role.features}
                icon={role.icon}
                isPrimary={role.isPrimary}
                isSelected={selectedRole === role.key}
                onClick={() => setSelectedRole(role.key)}
              />
            ))}
          </div>

          {selectedRole && (
            <div className="flex justify-center">
              <button
                onClick={handleContinue}
                disabled={isLoading}
                className="group inline-flex items-center gap-3 px-12 py-4 rounded-xl bg-background text-primary-foreground font-semibold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-primary-foreground" />
                    <span>Securing Connection...</span>
                  </>
                ) : (
                  <>
                    <span className="text-primary-foreground">
                      Continue as{" "}
                      {selectedRole === "patient" ? "Patient" : "Hospital"}
                    </span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          )}

          <div className="mt-16 text-center">
            <div className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
              <p className="text-base text-muted-foreground leading-relaxed">
                Both roles utilize advanced blockchain technology for secure,
                tamper-proof medical data management with full HIPAA compliance
                and enterprise-grade encryption. Your data remains private and
                under your control.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-16 p-8 text-center border-t border-border/50">
        <p className="text-sm text-muted-foreground font-medium">
          © 2024 BlockCare. HIPAA compliant blockchain health records platform.
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
