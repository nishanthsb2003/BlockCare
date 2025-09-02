import { supabase } from './client';

// File storage services
export const storageService = {
  // The main bucket for medical documents
  MEDICAL_DOCS_BUCKET: 'medical-documents',
  
  // Initialize buckets if they don't exist (usually done once on app startup)
  async initializeBuckets() {
    try {
      // Check if medical documents bucket exists, if not create it
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      
      if (listError) {
        console.warn('Warning: Could not list buckets:', listError.message);
        // Don't throw error - bucket might exist but we can't list due to RLS
        return;
      }

      const bucketExists = buckets?.find(b => b.name === this.MEDICAL_DOCS_BUCKET);
      
      if (!bucketExists) {
        console.log(`Attempting to create bucket: ${this.MEDICAL_DOCS_BUCKET}`);
        
        const { error: createError } = await supabase.storage.createBucket(this.MEDICAL_DOCS_BUCKET, {
          public: true, // Make it public for development (easier to avoid RLS issues)
          fileSizeLimit: 50 * 1024 * 1024, // 50MB limit per file
          allowedMimeTypes: [
            'application/pdf',
            'image/jpeg',
            'image/png',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ]
        });

        if (createError) {
          console.warn('Warning: Could not create bucket programmatically:', createError.message);
          console.log('Please create the bucket manually in Supabase Dashboard:');
          console.log('1. Go to Storage in your Supabase dashboard');
          console.log('2. Click "New Bucket"');
          console.log(`3. Name it "${this.MEDICAL_DOCS_BUCKET}"`);
          console.log('4. Set it as Public');
          // Don't throw error - user can create manually
          return;
        }
        
        console.log(`Successfully created bucket: ${this.MEDICAL_DOCS_BUCKET}`);
      } else {
        console.log(`Bucket ${this.MEDICAL_DOCS_BUCKET} already exists`);
      }
    } catch (error) {
      console.warn('Warning: Error during bucket initialization:', error);
      console.log('You may need to create the bucket manually in Supabase Dashboard');
      // Don't throw error - allow upload to proceed in case bucket exists
    }
  },
  
  // Upload a file to a specific patient folder
  async uploadFile(patientId: string, file: File, metadata?: Record<string, string>) {
    try {
      // Validate file size (10MB limit for individual files)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        throw new Error('File size exceeds 10MB limit');
      }

      // Create a unique path like: patient-123/timestamp-filename.pdf
      const timestamp = Date.now();
      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `patient-${patientId}/${timestamp}-${sanitizedFileName}`;

      const { data, error } = await supabase.storage
        .from(this.MEDICAL_DOCS_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false, // Don't overwrite existing files
          contentType: file.type,
          ...(metadata && { metadata }),
        });

      if (error) {
        console.error('Storage upload error:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },
  
  // Get a URL to access a file
  async getFileUrl(path: string) {
    try {
      // For public buckets, use public URL (faster and no auth required)
      const { data } = supabase.storage
        .from(this.MEDICAL_DOCS_BUCKET)
        .getPublicUrl(path);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw error;
    }
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
