import { supabase } from './client';

// Test database connectivity
export async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...');
    
    // First, try to check if the patients table exists
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Database connection test failed:', error);
      
      // Check if it's a table not found error
      if (error.message.includes('relation "patients" does not exist')) {
        console.error('The "patients" table does not exist in the database');
        return false;
      }
      
      return false;
    }
    
    console.log('Database connection successful, found', data?.length || 0, 'patients');
    return true;
  } catch (error) {
    console.error('Database connection test error:', error);
    return false;
  }
}

// Create a test patient
export async function createTestPatient() {
  try {
    console.log('Creating test patient...');
    
    const testPatient = {
      id: 'test-patient-123',
      name: 'Test Patient',
      email: 'hegdeadarsh82@gmail.com',
      age: 30,
      condition: 'General Checkup',
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('patients')
      .upsert(testPatient)
      .select()
      .single();

    if (error) {
      console.error('Error creating test patient:', error);
      return null;
    }

    console.log('Test patient created:', data);
    return data;
  } catch (error) {
    console.error('Error in createTestPatient:', error);
    return null;
  }
}

// List all patients (for debugging)
export async function listAllPatients() {
  try {
    console.log('Fetching all patients...');
    
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .limit(10);

    if (error) {
      console.error('Error fetching patients:', error);
      return [];
    }

    console.log('Found patients:', data);
    return data || [];
  } catch (error) {
    console.error('Error in listAllPatients:', error);
    return [];
  }
}

// Test the patient search functionality
export async function testPatientSearch(searchTerm: string) {
  try {
    console.log('Testing patient search for:', searchTerm);
    
    // Try by ID first
    let { data: patientById, error: idError } = await supabase
      .from('patients')
      .select('*')
      .eq('id', searchTerm)
      .single();

    if (!idError && patientById) {
      console.log('Patient found by ID:', patientById);
      return patientById;
    }

    // Try by email
    let { data: patientByEmail, error: emailError } = await supabase
      .from('patients')
      .select('*')
      .eq('email', searchTerm)
      .single();

    if (!emailError && patientByEmail) {
      console.log('Patient found by email:', patientByEmail);
      return patientByEmail;
    }

    console.log('Patient not found by ID or email');
    console.log('ID Error:', idError);
    console.log('Email Error:', emailError);
    return null;
  } catch (error) {
    console.error('Error in testPatientSearch:', error);
    return null;
  }
}
