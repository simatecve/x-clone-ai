import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lddxusawlzyvrvccztib.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZHh1c2F3bHp5dnJ2Y2N6dGliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3Mjg3OTIsImV4cCI6MjA4MTMwNDc5Mn0.-dYIW3o_YVtwzfamSmo-D1fYoxDO4EQxHmIiVuJAPdE';

export const supabase = createClient(supabaseUrl, supabaseKey);