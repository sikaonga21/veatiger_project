import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyrbdvagungyzypalppg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5cmJkdmFndW5neXp5cGFscHBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNzA3MzQsImV4cCI6MjA4Njg0NjczNH0.v1oEF9h0PLd6H_r4CFJ5j3yU5t-0-sDHQhFLeq8mWdw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
