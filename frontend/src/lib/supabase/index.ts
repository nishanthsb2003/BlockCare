import { supabase } from './client';
import { authService } from './auth';
import { storageService } from './storage';
import { patientService, documentService } from './database';

// Export individual services
export { supabase, authService, storageService, patientService, documentService };

// Convenient re-export of all services
export const supabaseServices = {
  auth: authService,
  storage: storageService,
  patients: patientService,
  documents: documentService,
};
