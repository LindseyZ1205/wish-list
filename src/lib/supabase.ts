import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Wish {
  id: string;
  title: string;
  description: string;
  category: 'travel' | 'lifestyle' | 'growth' | 'quality' | 'other';
  owner: 'lindsey' | 'lucia' | 'both';
  timeframe: 'short' | 'medium' | 'long';
  status: 'not_started' | 'planning' | 'in_progress' | 'completed';
  budget?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}
