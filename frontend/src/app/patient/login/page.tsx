"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Mail,
  Shield,
  Eye,
  EyeOff,
  ExternalLink,
  CheckCircle2,
  UserPlus,
} from "lucide-react";
import { Footer } from "@/components/ui/footer";
import { useAuth } from "@/hooks/supabase/useAuth";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const PatientLoginPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<"email" | "digilocker">(
    "email"
  );
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Check for registration success message
  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setRegistrationSuccess(true);
      setTimeout(() => setRegistrationSuccess(false), 5000);
    }
  }, [searchParams]);

  const isFormValid = () => {
    return (
      loginMethod === "digilocker" ||
      (isValidEmail(email) && password.length >= 6)
    );
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await signIn(email, password);

      if (!result.success) {
        const errorMessage =
          result.error instanceof Error
            ? result.error.message
            : typeof result.error === "string"
            ? result.error
            : "Login failed. Please check your credentials.";

        // More specific error handling
        if (errorMessage.includes("Invalid login credentials")) {
          setError(
            "Email or password is incorrect. Make sure you have registered this account first. If you haven't registered yet, click 'Create Account' below."
          );
        } else if (errorMessage.includes("Email not confirmed")) {
          setError(
            "Please check your email and click the confirmation link before logging in."
          );
        } else {
          setError(errorMessage);
        }
        return;
      }

      // Redirect to dashboard after successful login
      router.push("/patient/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDigiLockerLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate DigiLocker authentication
      await new Promise((r) => setTimeout(r, 2000));

      router.push("/patient/dashboard");
    } catch (err: any) {
      setError("DigiLocker authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Back Button */}
      <div className="p-4">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Main Login
        </Link>
      </div>

      {/* Success Message */}
      {registrationSuccess && (
        <div className="mx-4 mb-4">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <p className="text-sm text-green-800 dark:text-green-200">
              Registration successful! You can now sign in to your account.
            </p>
          </div>
        </div>
      )}

      {/* Login Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-xs tracking-widest text-foreground/70">
                BLOCKCARE PATIENT LOGIN
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-foreground">
              Welcome Back
            </h1>
            <p className="text-muted-foreground mt-1">
              Sign in to access your secure medical records
            </p>
          </div>

          {/* Login Method Toggle */}
          <div className="mb-6 flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                loginMethod === "email"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card hover:bg-muted text-foreground"
              }`}
            >
              Email & Password
            </button>
            <button
              onClick={() => setLoginMethod("digilocker")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                loginMethod === "digilocker"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card hover:bg-muted text-foreground"
              }`}
            >
              DigiLocker
            </button>
          </div>

          {loginMethod === "email" ? (
            <form
              onSubmit={handleEmailLogin}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    placeholder="Enter your password"
                    className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={!isFormValid() || loading}
                className="w-full mb-4 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              {/* Forgot Password */}
              <div className="text-center">
                <Link
                  href="/patient/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </form>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="text-center mb-6">
                <div className="mx-auto w-20 h-20 mb-4 relative">
                  <Image
                    src="/icons/digilocker.svg"
                    alt="DigiLocker"
                    width={80}
                    height={80}
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  DigiLocker Login
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Securely access your medical records using your DigiLocker
                  account
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <button
                onClick={handleDigiLockerLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                {loading ? (
                  "Connecting..."
                ) : (
                  <>
                    Continue with DigiLocker
                    <ExternalLink className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="mt-4 text-xs text-center text-muted-foreground">
                You will be redirected to DigiLocker for secure authentication
              </p>
            </div>
          )}

          {/* Registration Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/patient/register"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                <UserPlus className="h-4 w-4" />
                Create Account
              </Link>
            </p>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            By continuing, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PatientLoginPage;
