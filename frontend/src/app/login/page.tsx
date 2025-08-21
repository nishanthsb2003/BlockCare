"use client";
import type React from "react";
import { useState } from "react";
import { User, Building2, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RoleCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  features,
  icon,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-8 border bg-card shadow-md transition-all duration-300 transform
        ${
          isSelected
            ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg scale-[1.02]"
            : "border-border hover:shadow-lg hover:scale-[1.02]"
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
      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 flex items-center justify-center rounded-xl bg-muted shadow-inner">
          <div className="text-muted-foreground">{icon}</div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-center mb-3 text-foreground">
        {title}
      </h3>
      <p className="text-sm text-center text-muted-foreground mb-5 leading-relaxed">
        {description}
      </p>

      <ul className="space-y-2 text-sm">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
            <span>{feature}</span>
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
        "Access your medical records and manage your health data securely.",
      features: [
        "View medical history",
        "Manage data permissions",
        "Track consent status",
        "Secure verification",
      ],
      icon: <User className="h-10 w-10" />,
    },
    {
      key: "hospital" as const,
      title: "Hospital",
      description:
        "Manage patient records with enterprise-grade security and compliance.",
      features: [
        "Update patient records",
        "Access authorized data",
        "Manage staff permissions",
        "Audit trails",
      ],
      icon: <Building2 className="h-10 w-10" />,
    },
  ];

  const handleContinue = async () => {
    if (!selectedRole) return;
    setIsLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 1500));
      router.push(selectedRole === "patient" ? "/login/user" : "/login/doctor");
    } catch (error) {
      console.error("Navigation failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </header>

      <main className="px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-4xl font-extrabold text-foreground mb-4">
              Choose Your Role
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Access BlockCare's secure healthcare platform designed for both
              patients and healthcare providers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 mb-10 max-w-3xl mx-auto">
            {roles.map((role) => (
              <RoleCard
                key={role.key}
                title={role.title}
                description={role.description}
                features={role.features}
                icon={role.icon}
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
                className="px-8 py-4 rounded-xl bg-primary text-secondary font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full sm:w-auto shadow-md"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <span>
                    Continue as{" "}
                    {selectedRole === "patient" ? "Patient" : "Hospital"}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
