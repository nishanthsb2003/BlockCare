// Types for patient and document data

export interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  nextAppointment: string;
  status: "Active" | "Critical" | "Follow-up";
  email: string;
  phone: string;
  address: string;
  bloodType: string;
  emergencyContact: string;
}

export interface Document {
  id: number;
  name: string;
  type: string;
  date: string;
  size: string;
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
  [patientId: number]: Document[];
};
