import { createClient } from '@supabase/supabase-js';

// Priorizamos las variables de entorno (para Producción/Coolify)
// Si no existen, usamos las credenciales hardcoded (para Desarrollo local actual)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lddxusawlzyvrvccztib.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZHh1c2F3bHp5dnJ2Y2N6dGliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3Mjg3OTIsImV4cCI6MjA4MTMwNDc5Mn0.-dYIW3o_YVtwzfamSmo-D1fYoxDO4EQxHmIiVuJAPdE';

export const supabase = createClient(supabaseUrl, supabaseKey);