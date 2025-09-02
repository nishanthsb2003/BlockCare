import { supabase } from './client';

// User authentication services
export const authService = {
  // Register a new user with email and password
  async signUp(email: string, password: string) {
    console.log("🔧 AuthService: Attempting to register user:", email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    console.log("🔧 AuthService: SignUp result:", { data, error });
    
    if (error) {
      console.error("🔧 AuthService: SignUp error:", error);
      throw error;
    }
    
    console.log("🔧 AuthService: User registered successfully:", data.user?.id);
    return data;
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },

  // Sign out the current user
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get the current logged in user
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Get the current session
  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  // Reset password
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
  },

  // Check if user exists in auth.users table
  async debugCheckUser(email: string) {
    try {
      console.log("🔧 Checking if user exists in auth.users table for:", email);
      
      // This won't work from client side, but we can check current session
      const { data: session } = await supabase.auth.getSession();
      console.log("🔧 Current session:", session);
      
      const { data: user } = await supabase.auth.getUser();
      console.log("🔧 Current user:", user);
      
      return { session, user };
    } catch (error) {
      console.error("🔧 Error checking user:", error);
      return { error };
    }
  },

  // Update user profile
  async updateProfile(updates: { [key: string]: any }) {
    const { data, error } = await supabase.auth.updateUser(updates);
    
    if (error) throw error;
    return data;
  }
};
