import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://maajmpaoubjtxfxabuwa.supabase.co'
const supabaseKey = 'sb_publishable_OjELw7t2Iogr-8NutAacjQ_KGLcNyVp'

export const supabase = createClient(supabaseUrl, supabaseKey)