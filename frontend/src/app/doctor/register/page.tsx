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
  CheckCircle2,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { doctorService } from "@/lib/supabase/database";

// Form validation schema
const doctorRegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Doctor name must be at least 2 characters." })
    .max(50, { message: "Doctor name must not exceed 50 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  specialty: z
    .string()
    .min(2, { message: "Specialty must be at least 2 characters." })
    .max(50, { message: "Specialty must not exceed 50 characters." }),
  hospital: z
    .string()
    .min(2, { message: "Hospital name must be at least 2 characters." })
    .max(100, { message: "Hospital name must not exceed 100 characters." }),
  experience: z.string().min(1, { message: "Experience is required." }),
  verificationKey: z
    .string()
    .min(12, { message: "Verification key must be at least 12 characters." })
    .max(100, { message: "Verification key must not exceed 100 characters." }),
});

type DoctorRegisterFormValues = z.infer<typeof doctorRegisterSchema>;

export default function DoctorRegisterPage() {
  const router = useRouter();
  const [showVerificationKey, setShowVerificationKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<DoctorRegisterFormValues>({
    resolver: zodResolver(doctorRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      specialty: "",
      hospital: "",
      experience: "",
      verificationKey: "",
    },
  });

  async function onSubmit(data: DoctorRegisterFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      const doctorData = {
        name: data.name,
        email: data.email,
        specialty: data.specialty,
        hospital: data.hospital,
        experience: data.experience,
        verification_key: data.verificationKey,
      };

      await doctorService.createDoctor(doctorData);
      setSuccess(true);

      setTimeout(() => {
        router.push("/login/doctor?registered=true");
      }, 2000);
    } catch (err: any) {
      console.error("Doctor registration error:", err);
      if (err.message?.includes("duplicate key")) {
        setError(
          "A doctor with this email already exists. Please use a different email."
        );
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Registration Successful!</h1>
          <p className="text-muted-foreground mb-4">
            Your doctor account has been created successfully.
          </p>
          <p className="text-sm text-muted-foreground">
            Redirecting to login page...
          </p>
        </div>
      </div>
    );
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
              <CardTitle className="text-xl">Doctor Registration</CardTitle>
            </div>
          </div>
          <CardDescription>
            Create your medical professional account
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
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <UserCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Dr. John Smith"
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

              {/* Specialty Field */}
              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical Specialty</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Cardiology, Pediatrics, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Hospital Field */}
              <FormField
                control={form.control}
                name="hospital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital/Clinic</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="City General Hospital"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Experience Field */}
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input placeholder="5 years" {...field} />
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
                          placeholder="Enter your medical license verification key"
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
                      Your unique medical license verification key (minimum 12
                      characters)
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
                    Creating Account...
                  </div>
                ) : (
                  "Create Doctor Account"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <div className="px-6 pb-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Already have an account?{" "}
              <Link
                href="/login/doctor"
                className="font-medium text-primary hover:underline underline-offset-4"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </Card>
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
}
