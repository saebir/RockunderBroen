import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://msoscrxcdkqycyuclldq.supabase.co'; // ← skift til din Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zb3NjcnhjZGtxeWN5dWNsbGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NTgwOTgsImV4cCI6MjA2MDEzNDA5OH0.2XcjPnsw592xkVCYc0ue-g1MLovTesbJRe6nJTOgGkM'; // ← skift til din anon public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
