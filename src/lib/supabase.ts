import { createClient } from '@supabase/supabase-js'

export function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_KEY. ' +
      'Set them in .dev.vars for local dev or as Cloudflare Worker secrets for production.',
    )
  }

  return createClient(supabaseUrl, supabaseKey)
}
