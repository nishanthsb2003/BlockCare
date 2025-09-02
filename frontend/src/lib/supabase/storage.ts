import { supabase } from './client';

// File storage services
export const storageService = {
  // The main bucket for medical documents
  MEDICAL_DOCS_BUCKET: 'medical-documents',
  
  // Initialize buckets if they don't exist (usually done once on app startup)
  async initializeBuckets() {
    // Check if medical documents bucket exists, if not create it
    const { data: buckets } = await supabase.storage.listBuckets();
    
    if (!buckets?.find(b => b.name === this.MEDICAL_DOCS_BUCKET)) {
      await supabase.storage.createBucket(this.MEDICAL_DOCS_BUCKET, {
        public: true, // Public for development simplicity
        fileSizeLimit: 50 * 1024 * 1024, // 50MB limit per file
      });
    }
  },
  
  // Upload a file to a specific patient folder
  async uploadFile(patientId: string, file: File, metadata?: Record<string, string>) {
    // Create a path like: patient-123/filename.pdf
    const filePath = `patient-${patientId}/${Date.now()}-${file.name}`;
    
    const { data, error } = await supabase.storage
      .from(this.MEDICAL_DOCS_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
        ...(metadata && { metadata }),
      });
    
    if (error) throw error;
    return data;
  },
  
  // Get a URL to access a file
  async getFileUrl(path: string) {
    // For public buckets, we can get the public URL directly
    const { data } = supabase.storage.from(this.MEDICAL_DOCS_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  },
  
  // List all files for a patient
  async listPatientFiles(patientId: string) {
    const { data, error } = await supabase.storage
      .from(this.MEDICAL_DOCS_BUCKET)
      .list(`patient-${patientId}`);
    
    if (error) throw error;
    return data;
  },
  
  // Delete a file
  async deleteFile(path: string) {
    const { error } = await supabase.storage
      .from(this.MEDICAL_DOCS_BUCKET)
      .remove([path]);
    
    if (error) throw error;
    return true;
  },
  
  // Move or rename a file
  async moveFile(fromPath: string, toPath: string) {
    const { error } = await supabase.storage
      .from(this.MEDICAL_DOCS_BUCKET)
      .move(fromPath, toPath);
    
    if (error) throw error;
    return true;
  }
};
