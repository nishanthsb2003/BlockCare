"use client";

import { useState, useEffect } from 'react';
import { doctorService } from '@/lib/supabase/database';
import { DbDoctor } from '@/types/medical';

interface UseDoctorAuth {
  doctor: DbDoctor | null;
  loading: boolean;
  login: (name: string, email: string, verificationKey: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export function useDoctorAuth(): UseDoctorAuth {
  const [doctor, setDoctor] = useState<DbDoctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if doctor is logged in from localStorage
    const savedDoctor = localStorage.getItem('doctor');
    if (savedDoctor) {
      try {
        setDoctor(JSON.parse(savedDoctor));
      } catch (error) {
        console.error('Error parsing saved doctor:', error);
        localStorage.removeItem('doctor');
      }
    }
    setLoading(false);
  }, []);

  const login = async (name: string, email: string, verificationKey: string): Promise<boolean> => {
    try {
      setLoading(true);
      const authenticatedDoctor = await doctorService.authenticateDoctor(name, email, verificationKey);
      
      if (authenticatedDoctor) {
        setDoctor(authenticatedDoctor);
        localStorage.setItem('doctor', JSON.stringify(authenticatedDoctor));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Doctor login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setDoctor(null);
    localStorage.removeItem('doctor');
  };

  return {
    doctor,
    loading,
    login,
    logout,
    isAuthenticated: !!doctor,
  };
}
