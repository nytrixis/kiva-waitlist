import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Client for browser usage (with limited permissions)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations (with full permissions)
// Only use this in server components or API routes
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Type for the waitlist table
export type WaitlistEntry = {
  id: string;
  email: string;
  name: string;
  user_type: 'buyer' | 'seller' | 'influencer';
  feedback?: string;
  created_at: string;
  updated_at: string;
};
