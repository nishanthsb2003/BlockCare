"use client";

import { useState, useEffect } from 'react';
import { supabase, authService } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial user
    const getUserProfile = async () => {
      try {
        setLoading(true);
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error getting user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { user: authUser } = await authService.signIn(email, password);
      setUser(authUser);
      return { success: true, user: authUser };
    } catch (error) {
      console.error('Error signing in:', error);
      return { success: false, error };
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    try {
      const { user: authUser } = await authService.signUp(email, password);
      return { success: true, user: authUser };
    } catch (error) {
      console.error('Error signing up:', error);
      return { success: false, error };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Error signing out:', error);
      return { success: false, error };
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      await authService.resetPassword(email);
      return { success: true };
    } catch (error) {
      console.error('Error resetting password:', error);
      return { success: false, error };
    }
  };

  // Update user profile
  const updateProfile = async (updates: { [key: string]: any }) => {
    try {
      const { user: updatedUser } = await authService.updateProfile(updates);
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error };
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };
}
