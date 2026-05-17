import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bvrzuaocnsyjfwgtbyku.supabase.co'
const supabaseAnonKey = 'sb_publishable_7Qa0qdiYmIMmW6LtOOZKig_Vu2ROQh7'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)