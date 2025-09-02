"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Footer } from "@/components/ui/footer";
import {
  Eye,
  EyeOff,
  Stethoscope,
  UserCheck,
  Mail,
  Key,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useDoctorAuth } from "@/hooks/supabase/useDoctorAuth";

const doctorLoginSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Doctor name must be at least 2 characters.",
    })
    .max(50, {
      message: "Doctor name must not exceed 50 characters.",
    }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  verificationKey: z
    .string()
    .min(8, {
      message: "Verification key must be at least 8 characters.",
    })
    .max(100, {
      message: "Verification key must not exceed 100 characters.",
    }),
});

type DoctorLoginFormValues = z.infer<typeof doctorLoginSchema>;

export default function DoctorLoginPage() {
  const router = useRouter();
  const { login } = useDoctorAuth();
  const [showVerificationKey, setShowVerificationKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<DoctorLoginFormValues>({
    resolver: zodResolver(doctorLoginSchema),
    defaultValues: {
      name: "",
      email: "",
      verificationKey: "",
    },
  });

  async function onSubmit(data: DoctorLoginFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      const success = await login(data.name, data.email, data.verificationKey);

      if (success) {
        router.push("/doctor/dashboard");
      } else {
        setError(
          "Invalid credentials. Please check your name, email, and verification key."
        );
      }
    } catch (err) {
      console.error("Doctor login error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Stethoscope className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">
                Medical Professional Login
              </CardTitle>
            </div>
          </div>
          <CardDescription>
            Enter your credentials to access the medical dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <UserCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="dr. john smith"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="doctor@hospital.com"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Verification Key Field */}
              <FormField
                control={form.control}
                name="verificationKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Key</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showVerificationKey ? "text" : "password"}
                          placeholder="Enter your verification key"
                          className="pl-10 pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() =>
                            setShowVerificationKey(!showVerificationKey)
                          }
                          tabIndex={-1}
                        >
                          {showVerificationKey ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs text-muted-foreground">
                      Your unique medical license verification key
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-black"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Verifying...
                  </div>
                ) : (
                  "Login to Dashboard"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Need to create an account?{" "}
              <Link
                href="/doctor/register"
                className="font-medium text-primary hover:underline underline-offset-4"
              >
                Register as Doctor
              </Link>
            </p>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Need help with access?{" "}
              <Link
                href="/contact"
                className="font-medium text-primary hover:underline underline-offset-4"
              >
                Contact Support
              </Link>
            </p>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Patient login?{" "}
              <Link
                href="/patient/login"
                className="font-medium text-primary hover:underline underline-offset-4"
              >
                Switch to Patient Portal
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
}
