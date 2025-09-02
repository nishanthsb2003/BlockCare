// Types for patient and document data

export interface Patient {
  id: string; // UUID from database
  name: string;
  age: number | null;
  gender: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  condition: string | null;
  bloodtype: string | null; // matches database schema
  emergencycontact: string | null; // matches database schema
  allergies: string[] | null; // text array in database
  created_at: string | null;
  updated_at: string | null;
}

export interface Document {
  id: string; // UUID from database
  patient_id: string; // UUID reference to patient
  name: string;
  type: string;
  size: number; // int8 in database
  path: string;
  metadata?: any; // jsonb in database
  created_at?: string;
  updated_at?: string;
}

export interface Doctor {
  name: string;
  specialty: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  education: string;
  certifications: string[];
  bio: string;
  avatar: string;
}

export interface Appointment {
  time: string;
  patient: string;
  type: string;
}

export type PatientDocuments = {
  [patientId: string]: Document[];
};

// Additional interfaces for the patient system
export interface PatientRegistration {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  bloodtype: string;
  emergencycontact: string;
  allergies?: string;
}

export interface PatientLogin {
  email: string;
  password: string;
}
