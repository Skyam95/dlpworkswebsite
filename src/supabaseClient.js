import { createClient } from '@supabase/supabase-js'

// Remplacez par vos vraies valeurs depuis Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://vdibzvaxsxblpyoxneip.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkaWJ6dmF4c3hibHB5b3huZWlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNjAzMzksImV4cCI6MjA3NTYzNjMzOX0.z_vNPfm6uhOqCiH3Mzb0-CeDhgyne93Rb1bFw7q7AfE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)