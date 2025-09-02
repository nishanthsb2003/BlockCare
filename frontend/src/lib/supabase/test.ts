import { supabase } from './client';

export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log('Auth test:', authError ? 'Failed' : 'Success', { user: user?.email });
    
    const { data: tables, error: dbError } = await supabase
      .from('patients')
      .select('count', { count: 'exact' })
      .limit(0);
    console.log('Database test:', dbError ? 'Failed' : 'Success', { error: dbError });
    
    const { data: buckets, error: storageError } = await supabase.storage.listBuckets();
    console.log('Storage test:', storageError ? 'Failed' : 'Success', { 
      buckets: buckets?.length || 0, 
      error: storageError 
    });
    
    return {
      auth: !authError,
      database: !dbError,
      storage: !storageError,
      details: {
        authError,
        dbError,
        storageError,
        bucketsCount: buckets?.length || 0
      }
    };
  } catch (error) {
    console.error('Connection test failed:', error);
    return {
      auth: false,
      database: false,
      storage: false,
      error
    };
  }
};

export const testStorageOperations = async () => {
  try {
    console.log('Testing storage operations...');
    
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    console.log('Bucket listing:', listError ? 'Failed' : 'Success', { buckets: buckets?.map(b => b.name) });
    
    const medicalBucket = buckets?.find(b => b.name === 'medical-documents');
    console.log('Medical documents bucket:', medicalBucket ? 'Exists' : 'Missing');
    
    if (!medicalBucket) {
      console.log('Attempting to create medical-documents bucket...');
      const { error: createError } = await supabase.storage.createBucket('medical-documents', {
        public: false,
        fileSizeLimit: 50 * 1024 * 1024, // 50MB
        allowedMimeTypes: [
          'application/pdf',
          'image/jpeg',
          'image/png',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
      });
      
      if (createError) {
        console.error('Failed to create bucket:', createError);
      } else {
        console.log('Successfully created medical-documents bucket');
      }
    }
    
    return {
      success: !listError,
      hasMedicalBucket: !!medicalBucket,
      error: listError
    };
  } catch (error) {
    console.error('Storage operations test failed:', error);
    return {
      success: false,
      error
    };
  }
};
