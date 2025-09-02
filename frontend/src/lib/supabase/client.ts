import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
}

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase connection status:', supabaseUrl && supabaseAnonKey ? 'OK' : 'MISSING ENV VARS');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
