"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  IdCard,
  Phone,
  CheckCircle2,
  Shield,
} from "lucide-react";

const isValidEmail = (email: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
const isValidAadhaar = (value: string) => /^\d{12}$/.test(value);
const isValidOtp = (value: string) => /^\d{6}$/.test(value);

const UserLoginPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);

  const isFormFilled = useMemo(() => {
    return (
      name.trim().length > 1 && isValidEmail(email) && isValidAadhaar(aadhaar)
    );
  }, [name, email, aadhaar]);

  const handleSendOtp = async () => {
    setError(null);
    if (!isFormFilled) {
      setError("Please enter a valid name, email and 12‑digit Aadhaar number.");
      return;
    }
    setLoading(true);
    // Demo: simulate OTP send
    await new Promise((r) => setTimeout(r, 800));
    setOtpSent(true);
    setLoading(false);
  };

  const handleVerify = async () => {
    setError(null);
    if (!isValidOtp(otp)) {
      setError("Enter the 6‑digit OTP sent to your Aadhaar‑linked mobile.");
      return;
    }
    setLoading(true);
    // Demo: accept any 6‑digit OTP as valid
    await new Promise((r) => setTimeout(r, 700));
    setVerified(true);
    setLoading(false);

    // Redirect to user test page after successful verification
    router.push("/login/user/test");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Back */}
      <div className="p-4">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </div>

      {/* Form card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-xs tracking-widest text-foreground/70">
                BLOCKCARE LOGIN
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-foreground">
              User sign in
            </h1>
            <p className="text-muted-foreground mt-1">
              Enter your details and verify via Aadhaar‑linked number
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            {/* Name */}
            <label
              className="block text-sm font-medium text-foreground"
              htmlFor="name"
            >
              Full name
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Email */}
            <label
              className="block text-sm font-medium text-foreground mt-4"
              htmlFor="email"
            >
              Email
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Aadhaar */}
            <label
              className="block text-sm font-medium text-foreground mt-4"
              htmlFor="aadhaar"
            >
              Aadhaar number
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
              <IdCard className="h-4 w-4 text-muted-foreground" />
              <input
                id="aadhaar"
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={12}
                value={aadhaar}
                onChange={(e) =>
                  setAadhaar(e.target.value.replace(/[^\d]/g, ""))
                }
                placeholder="12‑digit Aadhaar"
                className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground tracking-widest"
              />
            </div>

            {/* Send OTP */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSendOtp}
                disabled={!isFormFilled || loading || otpSent}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Phone className="h-4 w-4" />
                {otpSent ? "OTP sent" : loading ? "Sending..." : "Send OTP"}
              </button>
            </div>

            {/* OTP field */}
            {otpSent && (
              <div className="mt-6">
                <label
                  className="block text-sm font-medium text-foreground"
                  htmlFor="otp"
                >
                  Enter OTP
                </label>
                <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/[^\d]/g, ""))
                    }
                    placeholder="6‑digit code"
                    className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground tracking-widest"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Demo: any 6‑digit code will verify
                  </p>
                  <button
                    onClick={handleVerify}
                    disabled={!isValidOtp(otp) || loading || verified}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {verified ? (
                      <>
                        Verified <CheckCircle2 className="h-4 w-4" />
                      </>
                    ) : (
                      "Verify & Continue"
                    )}
                  </button>
                </div>
              </div>
            )}

            {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing, you agree to the processing of your data per our
            privacy policy.
          </p>
        </div>
      </main>

      <footer className="p-6 text-center">
        <p className="text-xs text-muted-foreground">
          © 2024 BlockCare. HIPAA compliant blockchain health records.
        </p>
      </footer>
    </div>
  );
};

export default UserLoginPage;
