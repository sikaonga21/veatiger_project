import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://isrrbfclonghenzwqpjp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzcnJiZmNsb25naGVuendxcGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwNjg1NDIsImV4cCI6MjA5OTY0NDU0Mn0.SEsoMeJxU2Uj-IC_HJdZZQBGt_3uuHDEAy_SLY8lIpQ';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
