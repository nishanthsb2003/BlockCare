import { supabase } from './client';

// Database service for patients
export const patientService = {
  // Create a new patient record
  async createPatient(patientData: any) {
    const { data, error } = await supabase
      .from('patients')
      .insert(patientData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Get a patient by ID
  async getPatientById(id: string) {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get a patient by user_id (auth user ID)
  async getPatientByUserId(userId: string) {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get a patient by email
  async getPatientByEmail(email: string) {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Get all patients
  async getAllPatients() {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  // Update a patient
  async updatePatient(id: string, updates: any) {
    const { data, error } = await supabase
      .from('patients')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Delete a patient
  async deletePatient(id: string) {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};

// Database service for medical documents
export const documentService = {
  // Create a new document record with metadata
  async createDocument(documentData: any) {
    const { data, error } = await supabase
      .from('documents')
      .insert(documentData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Get all documents for a patient
  async getPatientDocuments(patientId: string) {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  // Get a document by ID
  async getDocumentById(id: string) {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Update a document's metadata
  async updateDocument(id: string, updates: any) {
    const { data, error } = await supabase
      .from('documents')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Delete a document record (this doesn't delete the actual file)
  async deleteDocument(id: string) {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};

// Database service for doctors
export const doctorService = {
  // Create a new doctor record
  async createDoctor(doctorData: any) {
    const { data, error } = await supabase
      .from('doctors')
      .insert(doctorData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Get a doctor by ID
  async getDoctorById(id: string) {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get a doctor by email
  async getDoctorByEmail(email: string) {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Authenticate doctor with name and verification key
  async authenticateDoctor(name: string, email: string, verificationKey: string) {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('name', name)
      .eq('email', email)
      .eq('verification_key', verificationKey)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update doctor information
  async updateDoctor(id: string, updates: any) {
    const { data, error } = await supabase
      .from('doctors')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get recent patients for a doctor
  async getDoctorPatients(doctorId: string) {
    const { data, error } = await supabase
      .from('patient_doctor_access')
      .select(`
        *,
        patients(*)
      `)
      .eq('doctor_id', doctorId)
      .order('accessed_at', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    return data;
  },

  // Add patient access for doctor
  async addPatientAccess(doctorId: string, patientId: string) {
    const { data, error } = await supabase
      .from('patient_doctor_access')
      .insert({
        doctor_id: doctorId,
        patient_id: patientId,
        accessed_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Check if doctor has access to patient
  async checkPatientAccess(doctorId: string, patientId: string) {
    const { data, error } = await supabase
      .from('patient_doctor_access')
      .select('*')
      .eq('doctor_id', doctorId)
      .eq('patient_id', patientId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
};
