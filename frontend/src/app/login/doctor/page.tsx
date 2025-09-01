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
import { Label } from "@/components/ui/label";
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
} from "lucide-react";
import Link from "next/link";

// Form validation schema
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
  const [showVerificationKey, setShowVerificationKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    // Simulate API call
    console.log("Doctor login data:", data);

    // Here you would typically make an API call to authenticate the doctor
    // For now, we'll just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);

    // Handle successful login - redirect to doctor test page
    router.push("/login/doctor/test");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              className="p-0 h-auto mb-4"
              onClick={() => router.push("/login")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
          </div>
          <CardTitle className="text-2xl">Hospital Login</CardTitle>
          <CardDescription>
            Secure access to patient records and hospital systems.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Doctor Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        Doctor Name
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dr. John Smith"
                        className="h-11 border-0 shadow-sm bg-muted/30 focus-visible:shadow-md focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-muted-foreground">
                      Enter your full professional name
                    </FormDescription>
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
                    <FormLabel className="text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="doctor@hospital.com"
                        className="h-11 border-0 shadow-sm bg-muted/30 focus-visible:shadow-md focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-muted-foreground">
                      Your registered medical professional email
                    </FormDescription>
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
                    <FormLabel className="text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4" />
                        Verification Key
                      </div>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showVerificationKey ? "text" : "password"}
                          placeholder="Enter your verification key"
                          className="h-11 pr-10 border-0 shadow-sm bg-muted/30 focus-visible:shadow-md focus-visible:ring-0 focus-visible:ring-offset-0"
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
                href="/login/user"
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
