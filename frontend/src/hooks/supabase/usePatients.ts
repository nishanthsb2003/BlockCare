"use client";

import { useState } from 'react';
import { patientService, documentService } from '@/lib/supabase';

export function usePatients() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get all patients
  const getPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const patients = await patientService.getAllPatients();
      return { success: true, patients };
    } catch (err: any) {
      setError(err.message || 'Failed to fetch patients');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Get a single patient by ID
  const getPatient = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const patient = await patientService.getPatientById(id);
      return { success: true, patient };
    } catch (err: any) {
      setError(err.message || 'Failed to fetch patient');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Create a new patient
  const createPatient = async (patientData: any) => {
    try {
      setLoading(true);
      setError(null);
      const patient = await patientService.createPatient(patientData);
      return { success: true, patient };
    } catch (err: any) {
      setError(err.message || 'Failed to create patient');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Update an existing patient
  const updatePatient = async (id: string, updates: any) => {
    try {
      setLoading(true);
      setError(null);
      const patient = await patientService.updatePatient(id, updates);
      return { success: true, patient };
    } catch (err: any) {
      setError(err.message || 'Failed to update patient');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Delete a patient
  const deletePatient = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await patientService.deletePatient(id);
      return { success: true };
    } catch (err: any) {
      setError(err.message || 'Failed to delete patient');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Get all documents for a patient
  const getPatientDocuments = async (patientId: string) => {
    try {
      setLoading(true);
      setError(null);
      const documents = await documentService.getPatientDocuments(patientId);
      return { success: true, documents };
    } catch (err: any) {
      setError(err.message || 'Failed to fetch patient documents');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getPatients,
    getPatient,
    createPatient,
    updatePatient,
    deletePatient,
    getPatientDocuments,
  };
}
