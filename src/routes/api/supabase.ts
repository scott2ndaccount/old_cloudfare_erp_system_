import { createFileRoute } from '@tanstack/react-router'
import { getSupabaseClient } from '@/lib/supabase'

export const Route = createFileRoute('/api/supabase')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const supabase = getSupabaseClient()
          const url = new URL(request.url)
          const table = url.searchParams.get('table')

          if (table) {
            const { data, error } = await supabase
              .from(table)
              .select('*')
              .limit(10)

            if (error) {
              return Response.json(
                { status: 'error', message: error.message, code: error.code },
                { status: 400 },
              )
            }

            return Response.json({ status: 'ok', table, data })
          }

          // Health check: verify Supabase connection by querying auth settings
          const { data, error } = await supabase.auth.getSession()

          return Response.json({
            status: 'connected',
            supabaseUrl: process.env.SUPABASE_URL,
            auth: error ? { error: error.message } : { session: data.session },
          })
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Unknown error'
          return Response.json({ status: 'error', message }, { status: 500 })
        }
      },
    },
  },
})
