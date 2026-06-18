import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://maajmpaoubjtxfxabuwa.supabase.co"
const supabaseKey = "sb_publishable_OjELw7t2Iogr-8NutAacjQ_KGLcNyVp"

// Con TypeScript, podemos decirle a Supabase qué tipo de datos esperamos
export const supabase = createClient(supabaseUrl, supabaseKey)
