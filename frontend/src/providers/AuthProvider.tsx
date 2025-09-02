"use client";

import { createContext, useContext, ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import { useAuth } from "@/hooks/supabase";

// Create the context with the same return type as useAuth
type AuthReturnType = ReturnType<typeof useAuth>;

const AuthContext = createContext<AuthReturnType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
